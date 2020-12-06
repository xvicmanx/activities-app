// @flow

import jwt from 'jsonwebtoken';
import _ from 'lodash';
import sha1 from 'sha1';

import type { Options } from '../../common/query-helpers';
import { generateQueryPayload } from '../../common/query-helpers';
import { getSafeUser } from './helpers';
import type { UserAttributes } from './model';
import User from './model';

const {
  JWT_SECRET,
  JWT_TOKEN_SECONDS_TO_EXPIRE,
} = process.env;

const secret = JWT_SECRET || 'test-secret';
// Expires in 1 day by default
const expireSeconds = JWT_TOKEN_SECONDS_TO_EXPIRE || 24 * 60 * 60;

const getExpirationTime = () => Math.floor(Date.now() / 1000) + expireSeconds;

export const getUserTokenInfo = (user: User) => {
  const {
    email,
    id,
  } = user.get({ plain: true });

  const expiresIn = getExpirationTime();

  return {
    token: jwt.sign(
      {
        id,
        email,
      },
      secret,
      { expiresIn },
    ),
    exp: expiresIn,
    user: getSafeUser(user),
  };
};

type UsersResult = {
  users: Array<User>,
  total: number,
};

class UsersService {
  async getUsers(options: Options): Promise<UsersResult> {
    const payload = generateQueryPayload(options);
    const result = await User.findAndCountAll(payload);
    return {
      total: result.count,
      users: result.rows.map(getSafeUser),
    };
  }

  async findById(id: number): Promise<?User> {
    return User.findOne({
      where: { id },
      include: this.include,
    });
  }

  async current(id: number): Promise<Object> {
    const user = await User.findOne({
      where: { id },
      include: this.include,
    });

    if (!user) {
      return null;
    }

    return getUserTokenInfo(user);
  }

  async findByToken(token: string): Promise<?User> {
    const {
      id,
      email,
    } = jwt.verify(token, secret);
    return User.findOne({ where: { id, email } });
  }

  async login(email: string, password: string): Promise<Object> {
    const user = await User.findOne({
      where: {
        email,
        password: sha1(password),
      },
      include: this.include,
    });

    if (!user) {
      return null;
    }

    return getUserTokenInfo(user);
  }

  async changePassword(
    id: number,
    previousPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    const user = await User.findOne({
      where: {
        id,
        password: sha1(previousPassword),
      },
      include: this.include,
    });

    if (!user) {
      return false;
    }

    user.password = sha1(newPassword);
    await user.save();

    return true;
  }

  async updateInformation(id: number, data: Object): Promise<boolean> {
    const user = await User.findOne({
      where: { id },
      include: this.include,
    });

    if (!user) {
      return false;
    }

    const fields = ['description'];
    await user.update(_.pick(data, fields));

    return true;
  }

  async updateProfilePictureURL(id: number, profileURL: Object): Promise<boolean> {
    const user = await User.findOne({
      where: { id },
      include: this.include,
    });

    if (!user) {
      return false;
    }

    await user.update({ profileURL });

    return true;
  }

  async userForEmailExists(email: string): Promise<boolean> {
    const existingUser = await User.findOne({ where: { email } });
    return !!existingUser;
  }

  async createUser(data: UserAttributes): Promise<User> {
    const fields = [
      'name',
      'email',
      'description',
    ];
    return User.create({
      ..._.pick(data, fields),
      password: sha1(data.password),
    });
  }

  async updateUser(data: UserAttributes): Promise<User> {
    const item = await User.findByPk(data.id);
    return item.update(data);
  }

  async deleteUser(id: number): Promise<User> {
    const item = await User.findByPk(id);
    await item.destroy(id);
    return item;
  }

  get include() {
    return [];
  }
}

export default UsersService;

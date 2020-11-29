// @flow

import jwt from 'jsonwebtoken';
import sha1 from 'sha1';

import { getSafeUser } from './helpers';
import User from './model';

const {
  JWT_SECRET,
  JWT_TOKEN_SECONDS_TO_EXPIRE,
} = process.env;

const secret = JWT_SECRET || 'test-secret';
// Expires in 1 day by default
const expireSeconds = JWT_TOKEN_SECONDS_TO_EXPIRE || 24 * 60 * 60;

const getExpirationTime = () => Math.floor(Date.now() / 1000) + expireSeconds

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

class UsersService {
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

  async userForEmailExists(email: string): Promise<boolean> {
    const existingUser = await User.findOne({ where: { email } });
    return !!existingUser;
  }

  get include() {
    return [];
  }
}

export default UsersService;

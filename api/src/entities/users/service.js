// @flow

import jwt from 'jsonwebtoken';
import sha1 from 'sha1';

import { getSafeUser } from './helpers';
import User from './model';

// TODO: change to use an env var
const SECRET = 'test-secret';

// Expires in 1 day
const EXPIRATION = Math.floor(Date.now() / 1000) + (24 * 60 * 60);

export const getUserTokenInfo = (user: User) => {
  const {
    email,
    id,
  } = user.get({ plain: true });

  return {
    token: jwt.sign(
      {
        id,
        email,
      },
      SECRET,
      { expiresIn: EXPIRATION },
    ),
    exp: EXPIRATION,
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
    } = jwt.verify(token, SECRET);
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

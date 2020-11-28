// @flow

import User from '../entities/users/model';
import { getUserTokenInfo } from '../entities/users/service';

export const getAuthHeaders = async (user: User) => {
  const { token } = await getUserTokenInfo(user);
  return { authorization: `Bearer ${token}` };
};

export const getUrl = (path: string) => `http://localhost:4600${path}`;

export default {
  getAuthHeaders,
  getUrl,
};

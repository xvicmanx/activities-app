//@flow

import { encode } from '../../../../core/helpers';
import type { Options } from '../../../../core/helpers';
import { readTokenFromCookie } from '../../redux/UsersActions';
import UsersService from '../../services/UsersService';

const Controller = {
  fetchItems: async (
    options: Options
  ): Promise<{ items: any, total: any, ... }> => {
    const response = await UsersService.fetchUsers(
      readTokenFromCookie(),
      encode(options)
    );
    return {
      items: response.users,
      total: response.total,
    };
  },
  create: async (user: Object): Promise<any> => {
    try {
      const result = await UsersService.createUser(user, readTokenFromCookie());
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  update: async (user: Object): Promise<any> => {
    try {
      const result = await UsersService.updateUser(user, readTokenFromCookie());
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  delete: async (user: Object): Promise<any> => {
    try {
      const result = await UsersService.deleteUser(
        user.id,
        readTokenFromCookie()
      );
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
};

export default Controller;

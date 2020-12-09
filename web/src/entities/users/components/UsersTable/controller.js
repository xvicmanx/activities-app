//@flow

import { toast } from 'react-toastify';

import { encode } from '../../../../core/helpers';
import type { Options } from '../../../../core/helpers';
import UsersService from '../../services/UsersService';

const Controller = {
  fetchItems: async (
    options: Options
  ): Promise<{ items: any, total: any, ... }> => {
    const response = await UsersService.fetchUsers(encode(options));
    return {
      items: response.users,
      total: response.total,
    };
  },
  create: async (user: Object): Promise<any> => {
    try {
      const result = await UsersService.createUser(user);
      toast.success('Usuario creado de manera exitosa!');
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
      const result = await UsersService.updateUser(user);
      toast.success('Usuario actualizado de manera exitosa!');
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
      const result = await UsersService.deleteUser(user.id);
      toast.success('Usuario eliminado de manera exitosa!');
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

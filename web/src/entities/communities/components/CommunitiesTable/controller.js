// @flow

import { encode } from '../../../../core/helpers';
import type { Options } from '../../../../core/helpers';
import { readToken } from '../../../users/redux/UsersActions';
import CommunitiesService from '../../services/CommunitiesService';

const Controller = {
  fetchItems: async (
    options: Options
  ): Promise<{ items: any, total: any, ... }> => {
    const response = await CommunitiesService.fetchCommunities(
      readToken(),
      encode(options)
    );
    return {
      items: response.communities,
      total: response.total,
    };
  },
  create: async (community: Object): Promise<any> => {
    try {
      const result = await CommunitiesService.createCommunity(
        community,
        readToken()
      );
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  update: async (community: Object): Promise<any> => {
    try {
      const result = await CommunitiesService.updateCommunity(
        community,
        readToken()
      );
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  delete: async (community: Object): Promise<any> => {
    try {
      const result = await CommunitiesService.deleteCommunity(
        community.id,
        readToken()
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

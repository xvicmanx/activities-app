// @flow

import { toast } from 'react-toastify';
import { encode } from '../../../../core/helpers';
import type { Options } from '../../../../core/helpers';
import CommunitiesService from '../../services/CommunitiesService';

const Controller = {
  fetchItems: async (
    options: Options
  ): Promise<{ items: any, total: any, ... }> => {
    const response = await CommunitiesService.fetchCommunities(encode(options));
    return {
      items: response.communities,
      total: response.total,
    };
  },
  create: async (community: Object): Promise<any> => {
    try {
      const result = await CommunitiesService.createCommunity(community);
      toast.success('Comunidad creada de manera exitosa!');
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
      const result = await CommunitiesService.updateCommunity(community);
      toast.success('Comunidad actualizada de manera exitosa!');
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
      const result = await CommunitiesService.deleteCommunity(community.id);
      toast.success('Comunidad eliminada de manera exitosa!');
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

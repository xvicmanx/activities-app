// @flow

import { encode } from '../../../../core/helpers';
import type { Options } from '../../../../core/helpers';
import { readTokenFromCookie } from '../../../users/redux/UsersActions';
import CommunitiesService from '../../services/CommunitiesService';

const Controller = {
  fetchItems: async (options: Options): Promise<{items: any, total: any,...}> => {
    const response = await CommunitiesService.fetchCommunities(
      readTokenFromCookie(),
      encode(options)
    );
    return {
      items: response.communities,
      total: response.total,
    };
  },
  create: (community: Object): Promise<any> =>
    CommunitiesService.createCommunity(community, readTokenFromCookie()),
  update: (community: Object): Promise<any> =>
    CommunitiesService.updateCommunity(community, readTokenFromCookie()),
  delete: (community: Object): Promise<any> =>
    CommunitiesService.deleteCommunity(community.id, readTokenFromCookie()),
};

export default Controller;

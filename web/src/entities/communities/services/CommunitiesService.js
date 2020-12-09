// @flow

import requester from '../../../core/requester';

const CommunitiesService = {
  fetchCommunities: (queryOptions: string = ''): Promise<Object> =>
    requester({ path: `/communities/list?options=${queryOptions}` }),
  fetchCommunity: (id: string | number): Promise<Object> =>
    requester({ path: `/communities/find/${id}` }),
  createCommunity: (payload: Object): Promise<Object> =>
    requester({
      path: '/communities/create',
      method: 'POST',
      payload,
    }),
  updateCommunity: (payload: Object): Promise<Object> =>
    requester({
      path: `/communities/${payload.id}/update`,
      method: 'PUT',
      payload,
    }),
  deleteCommunity: (id: string | number): Promise<Object> =>
    requester({
      path: `/communities/${id}/delete`,
      method: 'DELETE',
    }),
  addMember: (
    id: string | number,
    memberId: string | number,
    coordinates: boolean
  ): Promise<Object> =>
    requester({
      method: 'POST',
      path: `/communities/${id}/add-member/${memberId}?coordinates=${+coordinates}`,
    }),
};

export default CommunitiesService;

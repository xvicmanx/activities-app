// @flow

import requester from '../../../core/requester';

const CommunitiesService = {
  fetchCommunities: (token: string, queryOptions: string = ''): Promise<Object> =>
    requester({
      path: `/communities/list?options=${queryOptions}`,
      token,
    }),
  fetchCommunity: (token: string, id: string | number): Promise<Object> =>
    requester({
      path: `/communities/find/${id}`,
      token,
    }),
  createCommunity: (payload: Object, token: string): Promise<Object> =>
    requester({
      path: '/communities/create',
      method: 'POST',
      payload,
      token,
    }),
  updateCommunity: (payload: Object, token: string): Promise<Object> =>
    requester({
      path: `/communities/${payload.id}/update`,
      method: 'PUT',
      payload,
      token,
    }),
  deleteCommunity: (id: string | number, token: string): Promise<Object> =>
    requester({
      path: `/communities/${id}/delete`,
      method: 'DELETE',
      token,
    }),
  addMember: (
    token: string,
    id: string | number,
    memberId: string | number,
    coordinates: boolean
  ): Promise<Object> =>
    requester({
      method: 'POST',
      path: `/communities/${id}/add-member/${memberId}?coordinates=${+coordinates}`,
      token,
    }),
};

export default CommunitiesService;

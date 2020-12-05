import requester from '../../../core/requester';

export default {
  fetchCommunities: (token) =>
    requester({
      path: '/communities/list',
      token,
    }),
  fetchCommunity: (token, id) =>
    requester({
      path: `/communities/find/${id}`,
      token,
    }),
  createCommunity: (payload, token) =>
    requester({
      path: '/communities/create',
      method: 'POST',
      payload,
      token,
    }),
  updateCommunity: (payload, token) =>
    requester({
      path: `/communities/${payload.id}/update`,
      method: 'PUT',
      payload,
      token,
    }),
  deleteCommunity: (id, token) =>
    requester({
      path: `/communities/${id}/delete`,
      method: 'DELETE',
      token,
    }),
  addMember: (token, id, memberId, coordinates) =>
    requester({
      method: 'POST',
      path: `/communities/${id}/add-member/${memberId}?coordinates=${+coordinates}`,
      token,
    }),
};

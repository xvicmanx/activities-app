import requester from '../requester';

const deleteCommunity = (id, token) => requester({
  path: `/communities/${id}/delete`,
  method: 'DELETE',
  token,
});

export default deleteCommunity;

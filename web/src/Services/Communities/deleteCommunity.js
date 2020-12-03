import requester from '../requester';

const deleteCommunity = (id, token) => requester({
  path: `/communities/${id}`,
  method: 'DELETE',
  token,
});

export default deleteCommunity;

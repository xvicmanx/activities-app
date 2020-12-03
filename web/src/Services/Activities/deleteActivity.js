import requester from '../requester';

const deleteActivity = (id, token) => requester({
  path: `/activities/${id}`,
  method: 'DELETE',
  token,
});

export default deleteActivity;

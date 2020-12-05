import requester from '../../../../core/requester';

const deleteActivity = (id, token) => requester({
  path: `/activities/${id}/delete`,
  method: 'DELETE',
  token,
});

export default deleteActivity;

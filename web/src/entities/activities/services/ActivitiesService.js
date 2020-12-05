import requester from '../../../core/requester';

export default {
  fetchActivities: (token) => requester({
    path: '/activities/list',
    token,
  }),
  createActivity: (payload, token) => requester({
    path: '/activities/create',
    method: 'POST',
    payload,
    token,
  }),
  updateActivity: (payload, token) => requester({
    path: `/activities/${payload.id}/update`,
    method: 'PUT',
    payload,
    token,
  }),
  deleteActivity: (id, token) => requester({
    path: `/activities/${id}/delete`,
    method: 'DELETE',
    token,
  }),
};

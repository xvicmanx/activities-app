// @flow

import requester from '../../../core/requester';

const ActivitiesService = {
  fetchActivities: (queryOptions: string = ''): Promise<Object> =>
    requester({
      path: `/activities/list?options=${queryOptions}`,
    }),
  createActivity: (payload: Object): Promise<Object> =>
    requester({
      path: '/activities/create',
      method: 'POST',
      payload,
    }),
  updateActivity: (payload: Object): Promise<Object> =>
    requester({
      path: `/activities/${payload.id}/update`,
      method: 'PUT',
      payload,
    }),
  deleteActivity: (id: string | number): Promise<Object> =>
    requester({
      path: `/activities/${id}/delete`,
      method: 'DELETE',
    }),
};

export default ActivitiesService;

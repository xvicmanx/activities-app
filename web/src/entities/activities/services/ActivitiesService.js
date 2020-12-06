// @flow

import requester from '../../../core/requester';

const ActivitiesService = {
  fetchActivities: (
    token: string,
    queryOptions: string = ''
  ): Promise<Object> =>
    requester({
      path: `/activities/list?options=${queryOptions}`,
      token,
    }),
  createActivity: (payload: Object, token: string): Promise<Object> =>
    requester({
      path: '/activities/create',
      method: 'POST',
      payload,
      token,
    }),
  updateActivity: (payload: Object, token: string): Promise<Object> =>
    requester({
      path: `/activities/${payload.id}/update`,
      method: 'PUT',
      payload,
      token,
    }),
  deleteActivity: (id: string | number, token: string): Promise<Object> =>
    requester({
      path: `/activities/${id}/delete`,
      method: 'DELETE',
      token,
    }),
};

export default ActivitiesService;

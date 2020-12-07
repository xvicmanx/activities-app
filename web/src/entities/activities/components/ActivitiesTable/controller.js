// @flow

import { readTokenFromCookie } from '../../../users/redux/UsersActions';
import { encode } from '../../../../core/helpers';
import type { Options } from '../../../../core/helpers';
import ActivitiesService from '../../services/ActivitiesService';


const Controller = {
  fetchItems: async (options: Options): Promise<{items: any, total: any,...}> => {
    const response = await ActivitiesService.fetchActivities(
      readTokenFromCookie(),
      encode(options)
    );
    return {
      items: response.activities,
      total: response.total,
    };
  },
  create: (activity: Object): Promise<any> =>
    ActivitiesService.createActivity(activity, readTokenFromCookie()),
  update: (activity: Object): Promise<any> =>
    ActivitiesService.updateActivity(activity, readTokenFromCookie()),
  delete: (activity: Object): Promise<any> =>
    ActivitiesService.deleteActivity(activity.id, readTokenFromCookie()),
};

export default Controller;

// @flow

import User from '../users/model';
import Activity from './model';

class ActivitiesService {
  async getPendingActivities(userId: number): Promise<Array<Activity>> {
    const user = await User.findOne({
      where: { id: userId },
      include: [{
        model: Activity,
        as: 'activities',
      }],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.activities;
  }

  get include() {
    return [];
  }
}

export default ActivitiesService;

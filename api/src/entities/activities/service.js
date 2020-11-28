// @flow

import User from '../users/model';
import Activity from './model';

type ActivityListInfo = {
  id: number,
  title: string,
  description: string,
  date: Date,
  userWillAttend: boolean,
  willAttendCount: Number,
};

const willAttend = (x) => x.UserActivity.willAttend;

class ActivitiesService {
  async getPendingActivities(userId: number): Promise<Array<ActivityListInfo>> {
    const user = await User.findOne({
      where: { id: userId },
      include: [{
        model: Activity,
        as: 'activities',
        include: [{
          model: User,
          attributes: ['id'],
        }],
      }],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.activities.map((activity) => ({
      id: activity.id,
      title: activity.title,
      description: activity.description,
      date: activity.date,
      userWillAttend: willAttend(activity),
      willAttendCount: activity.users.filter(willAttend).length,
    }));
  }

  get include() {
    return [];
  }
}

export default ActivitiesService;

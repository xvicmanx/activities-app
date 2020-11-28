// @flow

import { throwNotFoundError, throwValidationError } from '../../helpers';
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

type ActivityParticipant = {
  id: number,
  name: string,
  profileURL: string,
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
          as: 'participants',
          attributes: ['id'],
        }],
      }],
    });

    if (!user) {
      throwNotFoundError('User not found');
    }

    return user.activities.map((activity) => ({
      id: activity.id,
      title: activity.title,
      description: activity.description,
      date: activity.date,
      userWillAttend: willAttend(activity),
      willAttendCount: activity.participants.filter(willAttend).length,
    }));
  }

  async getParticipantsList(activityId: number): Promise<Array<ActivityParticipant>> {
    const activity = await Activity.findOne({
      where: { id: activityId },
      include: this.include,
    });

    if (!activity) {
      throwNotFoundError('Activity not found');
    }

    return activity.participants.filter(willAttend);
  }

  async joinActivity(activityId: number, userId: number): Promise<?ActivityListInfo> {
    return this.changeAttendingStatus(
      activityId,
      userId,
      true,
    );
  }

  async unjoinActivity(activityId: number, userId: number): Promise<?ActivityListInfo> {
    return this.changeAttendingStatus(
      activityId,
      userId,
      false,
    );
  }

  async changeAttendingStatus(activityId: number, userId: number, willAttendActivity: boolean): Promise<?ActivityListInfo> {
    const activity = await Activity.findOne({
      where: { id: activityId },
      include: this.include,
    });

    if (!activity) {
      throwNotFoundError('Activity not found');
    }

    const participant = activity.participants.find((p) => p.id === userId);

    if (!participant) {
      throwValidationError('user', 'User is not part of the activity');
    }

    participant.UserActivity.willAttend = willAttendActivity;
    await participant.UserActivity.save();
    await participant.UserActivity.reload();

    return {
      id: activity.id,
      title: activity.title,
      description: activity.description,
      date: activity.date,
      userWillAttend: participant.UserActivity.willAttend,
      willAttendCount: activity.participants.filter(willAttend).length,
    };
  }

  get include() {
    return [{
      model: User,
      as: 'participants',
      attributes: [
        'id',
        'name',
        'profileURL',
      ],
    }];
  }
}

export default ActivitiesService;

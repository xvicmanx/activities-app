// @flow

import { throwNotFoundError } from '../../helpers';
import User from '../users/model';
import Community from './model';

class CommunitiesService {
  async findById(id: number): Promise<?Community> {
    const community = await Community.findOne({
      where: { id },
      include: this.include,
    });

    return community;
  }

  async getUserCommunities(userId: number): Promise<Array<Community>> {
    const user = await User.findOne({
      where: { id: userId },
      include: [{
        model: Community,
        as: 'communities',
      }],
    });

    if (!user) {
      throwNotFoundError('User not found');
    }

    return user.communities;
  }

  get include() {
    return [{
      model: User,
      attributes: [
        'id',
        'name',
        'profileURL',
      ],
      as: 'members',
    }];
  }
}

export default CommunitiesService;

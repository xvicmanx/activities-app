// @flow

import User from '../users/model';
import Community from './model';

class CommunitiesService {
  async getUserCommunities(userId: number): Promise<Array<Community>> {
    const user = await User.findOne({
      where: { id: userId },
      include: [{
        model: Community,
        as: 'communities',
      }],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.communities;
  }

  get include() {
    return [];
  }
}

export default CommunitiesService;

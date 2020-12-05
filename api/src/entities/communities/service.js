// @flow

import _ from 'lodash';

import { throwNotFoundError } from '../../helpers';
import User from '../users/model';
import type { CommunityAttributes } from './model';
import Community from './model';

class CommunitiesService {
  async getCommunities(): Promise<Array<Community>> {
    return Community.findAll();
  }

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

  async createCommunity(data: CommunityAttributes): Promise<Community> {
    return Community.create(data);
  }

  async updateCommunity(data: CommunityAttributes): Promise<Community> {
    const item = await Community.findByPk(data.id);
    return item.update(data);
  }

  async deleteCommunity(id: number): Promise<Community> {
    const item = await Community.findByPk(id);
    await item.destroy(id);
    return item;
  }

  async addMember(id: number, memberId: number, coordinates: boolean): Promise<?Object> {
    const item = await Community.findByPk(id);
    await item.addMember(memberId, { through: { coordinates } });
    const user = await User.findByPk(memberId);

    return {
      ..._.pick(user, [
        'id',
        'name',
        'profileURL',
      ]),
      coordinates,
    };
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

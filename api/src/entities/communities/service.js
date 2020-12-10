// @flow

import _ from 'lodash';

import type { Options } from '../../common/query-helpers';
import { generateQueryPayload } from '../../common/query-helpers';
import { throwNotFoundError } from '../../helpers';
import User from '../users/model';
import type { CommunityAttributes } from './model';
import Community from './model';

type CommunitiesResult = {
  communities: Array<Community>,
  total: number,
};

class CommunitiesService {
  async getCommunities(options: Options): Promise<CommunitiesResult> {
    const payload = generateQueryPayload(options);
    const result = await Community.findAndCountAll(payload);
    return {
      total: result.count,
      communities: result.rows,
    };
  }

  async findById(id: string): Promise<?Community> {
    const community = await Community.findOne({
      where: { id },
      include: this.include,
    });

    return community;
  }

  async getUserCommunities(userId: string): Promise<Array<Community>> {
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

  async deleteCommunity(id: string): Promise<Community> {
    const item = await Community.findByPk(id);
    await item.destroy(id);
    return item;
  }

  async addMember(id: string, memberId: string, coordinates: boolean): Promise<?Object> {
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

// @flow

import Sequelize from 'sequelize';

import type { UserAttributes } from '../users/model';

export type CommunityAttributes = {
  id?: number;
  name: string;
  slogan: string;
  members?: Array<UserAttributes>;
};

class Community extends Sequelize.Model<CommunityAttributes> {
  static setup(sequelize: Sequelize) {
    return super.init(
      {
        name: { type: Sequelize.STRING, required: true },
        slogan: { type: Sequelize.STRING, required: true },
      },
      {
        sequelize,
        modelName: 'community',
        timestamp: true,
      },
    );
  }

  static associate(models: Object) {
    this.members = this.belongsToMany(models.User, { through: models.UserCommunity, as: 'members' });
  }
}

export default Community;

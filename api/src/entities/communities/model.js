// @flow

import Sequelize from 'sequelize';

import type { UserAttributes } from '../users/model';

export type CommunityAttributes = {
  id?: string;
  name: string;
  slogan: string;
  members?: Array<UserAttributes>;
};

class Community extends Sequelize.Model<CommunityAttributes> {
  static setup(sequelize: Sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
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

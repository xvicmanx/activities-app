// @flow

import Sequelize from 'sequelize';

export type UserAttributes = {
  id?: number;
  name: string;
  email: string;
  admin: boolean;
  description?: string;
  profileURL?: string;
  password?: string;
};

class User extends Sequelize.Model<UserAttributes> {
  static setup(sequelize: Sequelize) {
    return super.init(
      {
        name: { type: Sequelize.STRING, required: true },
        email: {
          type: Sequelize.STRING,
          unique: true,
          required: true,
        },
        description: { type: Sequelize.STRING },
        profileURL: { type: Sequelize.STRING },
        admin: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        password: { type: Sequelize.STRING, required: true },
      },
      {
        sequelize,
        modelName: 'user',
        timestamp: true,
      },
    );
  }

  static associate(models: Object) {
    this.activities = this.belongsToMany(
      models.Activity,
      {
        through: models.UserActivity,
        as: 'activities',
      },
    );
    this.communities = this.belongsToMany(
      models.Community,
      {
        through: models.UserCommunity,
        as: 'communities',
      },
    );
  }
}

export default User;

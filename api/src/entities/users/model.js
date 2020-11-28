// @flow

import Sequelize from 'sequelize';

export type UserAttributes = {
  id?: number;
  name: string;
  email: string;
  description: string;
  password: string;
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
        description: { type: Sequelize.STRING, required: true },
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
    // $FlowFixMe
    this.activities = this.belongsToMany(models.Activity, { through: models.UserActivity });
  }
}

export default User;

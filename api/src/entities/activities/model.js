// @flow

import Sequelize from 'sequelize';

export type ActivityAttributes = {
  id?: number;
  title: string;
  description: string;
  date: Date;
};

class Activity extends Sequelize.Model<ActivityAttributes> {
  static setup(sequelize: Sequelize) {
    return super.init(
      {
        title: { type: Sequelize.STRING, required: true },
        description: { type: Sequelize.STRING, required: true },
        date: { type: Sequelize.DATE, required: true },
      },
      {
        sequelize,
        modelName: 'activity',
        timestamp: true,
      },
    );
  }

  static associate(models: Object) {
    // $FlowFixMe
    this.participants = this.belongsToMany(
      models.User,
      {
        through: models.UserActivity,
        as: 'participants',
      },
    );
  }
}

export default Activity;

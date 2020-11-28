// @flow

import User from '../users/model';
import Activity from './model';

const faker = require('faker');

export default async () => {
  // Seed activities
  const count = await Activity.count();

  if (count <= 0) {
    const data = [...Array(5)]
      .map((x, i) => ({
        title: `Test activity ${i + 1}`,
        description: faker.lorem.text(),
        date: faker.date.recent(),
      }));

    await Activity.bulkCreate(data);

    const users = await User.findAll();
    const activites = await Activity.findAll();

    const promises = [];
    users.forEach((user) => {
      activites.forEach((activity) => {
        const promise = user.addActivity(activity, { through: { willAttend: true } });
        promises.push(promise);
      });
    });

    await Promise.all(promises);
  }
};

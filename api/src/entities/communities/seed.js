// @flow

import User from '../users/model';
import Community from './model';

const faker = require('faker');

export default async () => {
  // Seed communities
  const count = await Community.count();

  if (count <= 0) {
    const data = [...Array(5)]
      .map((x, i) => ({
        name: `Test community ${i + 1}`,
        slogan: faker.lorem.text(),
      }));

    await Community.bulkCreate(data);

    const users = await User.findAll();
    const activites = await Community.findAll();

    const promises = [];
    users.forEach((user) => {
      activites.forEach((community) => {
        const promise = user.addCommunity(community, { through: { coordinates: false } });
        promises.push(promise);
      });
    });

    await Promise.all(promises);
  }
};

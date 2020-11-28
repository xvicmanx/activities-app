// @flow

import sha1 from 'sha1';

import User from './model';

const faker = require('faker');

export default async () => {
  // Seed users
  const usersCount = await User.count();

  if (usersCount <= 0) {
    const password = sha1('123456');

    const fakeUsersData = [...Array(5)]
      .map(() => ({
        name: faker.name.findName(),
        email: faker.internet.email(),
        description: faker.lorem.text(),
        password,
      }));

    await User.bulkCreate([
      {
        name: 'John Doe',
        email: 'johndoe@test.com',
        description: faker.lorem.text(),
        password,
      },
      {
        name: 'Mary Jane',
        email: 'maryjane@test.com',
        description: faker.lorem.text(),
        password,
      },
      ...fakeUsersData,
    ]);
  }
};

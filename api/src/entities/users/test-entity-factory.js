import sha1 from 'sha1';

import User from './model';

const faker = require('faker');

// Test User Factory
export default async (updateData = {}) => {
  const password = sha1('123456');

  const user = await User.create({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    description: faker.lorem.text(),
    profileURL: faker.image.imageUrl(),
    ...updateData,
  });

  return user.reload();
};

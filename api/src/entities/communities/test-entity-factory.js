import Community from './model';

const faker = require('faker');

// Test Community Factory
export default async () => {
  const item = await Community.create({
    name: faker.name.findName(),
    slogan: faker.lorem.text(),
  });

  return item.reload();
};

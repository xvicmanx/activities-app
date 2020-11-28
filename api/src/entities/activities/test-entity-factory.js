import Activity from './model';

const faker = require('faker');

// Test Activity Factory
export default async () => {
  const item = await Activity.create({
    title: faker.name.findName(),
    date: faker.date.recent(),
    description: faker.lorem.text(),
  });

  return item.reload();
};

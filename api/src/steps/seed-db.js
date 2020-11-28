// @flow

import seedUsers from '../entities/users/seed';


const { log } = console;

export default async () => {
  log('Seeding Data START');
  await seedUsers();
  log('Seeding Data END');
};

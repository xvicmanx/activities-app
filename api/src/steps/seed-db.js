// @flow

import seedActivities from '../entities/activities/seed';
import seedUsers from '../entities/users/seed';


const { log } = console;

export default async () => {
  log('Seeding Data START');
  await seedUsers();
  await seedActivities();
  log('Seeding Data END');
};

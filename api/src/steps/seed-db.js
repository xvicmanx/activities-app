// @flow

import seedActivities from '../entities/activities/seed';
import seedCommunities from '../entities/communities/seed';
import seedUsers from '../entities/users/seed';

const { log } = console;

export default async () => {
  log('Seeding Data START');
  await seedUsers();
  await seedCommunities();
  await seedActivities();
  log('Seeding Data END');
};

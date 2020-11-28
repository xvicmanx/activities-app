import fs from 'fs';
import { after, before } from 'mocha';

import setupServer from './setup-server';

const { log } = console;

const port = 4600;

let server;

before(async () => {
  const app = await setupServer(port);
  server = app.listen(port, () => {});
  log('\n** Tests **\n');
});

after(() => {
  server.close();
  fs.unlinkSync(`${__dirname}/../../data/test-db.sqlite`, () => {});
  process.exit(0);
});

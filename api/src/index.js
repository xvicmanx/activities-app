
// @flow

import setupServer from './steps/setup-server';

(async () => {
  const { log } = console;
  const { PORT } = process.env;
  const port = +(PORT || 4500);

  const server = await setupServer(port);

  server.listen(port, () => {
    log(`Starting server on port ${port}!`);
  });
})();

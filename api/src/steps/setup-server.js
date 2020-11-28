
// @flow

import bodyParser from 'body-parser';
import cors from 'cors';
import type {
  $Application,
  $Request,
  $Response,
} from 'express';
import express from 'express';
import faye from 'faye';
import http from 'http';

import { getLoggedInUser } from '../helpers';
import seedDB from './seed-db';
import setupDB from './setup-db';
import setupRoutes from './setup-routes';
import setupSwaggerDocumentation from './setup-swagger';


const setupServer = async (port: number) => {
  const app: $Application<$Request, $Response> = express();

  const db = await setupDB();

  await seedDB();
  await setupSwaggerDocumentation(app, port);

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(cors());

  // Serves resources from public folder
  app.use(express.static(`${__dirname}/../../public`));

  // Subscription setup step 1
  const bayeux = new faye.NodeAdapter({
    mount: '/faye',
    timeout: 50,
  });

  // Trigger events
  db.addHook('afterCreate', (data) => {
    // eslint-disable-next-line no-underscore-dangle
    const modelName = data._modelOptions ? data._modelOptions.name.singular : null;
    if (modelName === 'event' && data.dataValues.notify) {
      const {
        userId,
        title,
        description,
      } = data.dataValues;
      bayeux.getClient().publish(
        `/event-channel-${userId}`,
        { title, description },
      );
    }

    if (modelName === 'Activity') {
      const { workRequestId } = data.dataValues;
      bayeux.getClient().publish(
        '/conversation-channel',
        { id: workRequestId },
      );
    }
  });

  app.use(async (req: $Request, res: $Response, next: Function) => {
    try {
      res.locals.user = await getLoggedInUser(req);
    } catch (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    next();
  });

  setupRoutes(app);

  // Subscription setup step 2
  const server = http.createServer(app);

  // Subscription setup step 3
  bayeux.attach(server);

  return server;
};

export default setupServer;

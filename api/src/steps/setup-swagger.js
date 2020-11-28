// @flow

import type {
  $Application,
  $Request,
  $Response,
} from 'express';
import swaggerGenerator from 'express-swagger-generator';

const { log } = console;

export default (
  app: $Application<$Request, $Response>,
  port: number,
) => {
  log('Setting Up Swagger START');

  const expressSwagger = swaggerGenerator(app);

  expressSwagger({
    swaggerDefinition: {
      info: {
        description: 'Activities App API',
        title: 'Activities App Swagger',
        version: '1.0.0',
      },
      host: `localhost:${port}`,
      basePath: '/',
      produces: [
        'application/json',
        'application/xml',
      ],
      schemes: ['http', 'https'],
    },
    // app absolute path
    basedir: __dirname,
    // Path to the API handle folder
    files: ['../entities/**/routes.js'],
  });

  log('Setting Up Swagger END');
};

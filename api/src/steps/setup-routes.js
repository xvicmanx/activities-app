// @flow

import type {
  $Application,
  $Request,
  $Response,
} from 'express';
import requireAll from 'require-all';

const routes = requireAll({
  dirname: `${__dirname}/../entities/`,
  filter: /routes\.js$/,
  recursive: true,
});

export default (app: $Application<$Request, $Response>) => {
  Object.keys(routes || {}).forEach((key) => {
    app.use(`/${key}`, routes[key]['routes.js'].default());
  });
};

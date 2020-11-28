// @flow

import type {
  $Application,
  $Request,
  $Response,
} from 'express';
import express from 'express';

import { authRequired } from '../../helpers';
import ActivitiesController from './controller';
import ActivitiesService from './service';

const getRoutes = () => {
  const app: $Application<$Request, $Response> = express();
  const service = new ActivitiesService();
  const controller = new ActivitiesController(service);

  /**
   * @typedef ActivityListInfo
   * @property {integer} id
   * @property {string} title.required
   * @property {string} description
   * @property {string} date.required
   * @property {boolean} userWillAttend
   * @property {integer} willAttendCount
   */


  /**
   * @typedef PendingActivitiesResponse
   * @property {boolean} success
   * @property {ActivityListInfo[]} activities
   */

  /**
   * Gets the current user pending activities
   * @route GET /activities/pending
   * @group Activity - Activity
   * @param {string} authorization.header.required - authorization token header
   * @returns {PendingActivitiesResponse.model} 200 - pending activities response
   * @returns {Error}  default - Unexpected error
   */
  app.get('/pending', authRequired(controller.getPendingActivities));

  return app;
};

export default getRoutes;

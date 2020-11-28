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
   * @typedef ActivityParticipant
   * @property {integer} id
   * @property {string} name
   * @property {string} profileURL
   */

  /**
   * @typedef PendingActivitiesResponse
   * @property {boolean} success
   * @property {ActivityListInfo[]} activities
   */

  /**
   * @typedef ActivityParticipantsListResponse
   * @property {boolean} success
   * @property {ActivityParticipant[]} participants
   */

  /**
   * Gets the current user pending activities
   * @route GET /activities/pending
   * @group Activity - Operations about activity
   * @param {string} authorization.header.required - authorization token header
   * @returns {PendingActivitiesResponse.model} 200 - pending activities response
   * @returns {Error}  default - Unexpected error
   */
  app.get('/pending', authRequired(controller.getPendingActivities));

  /**
   * Gets the activity participants list
   * @route GET /activities/:id/participants-list
   * @group Activity - Operations about activity
   * @param {string} authorization.header.required - authorization token header
   * @returns {ActivityParticipantsListResponse.model} 200 - activity participants list response
   * @returns {Error}  default - Unexpected error
   */
  app.get('/:id/participants-list', authRequired(controller.getParticipantsList));

  /**
  * Joins an activity
  * @route PUT /{id}/join
  * @group Activity - Operations about activity
  * @param {integer} id.path.required - the id of the activity
  * @param {string} authorization.header.required - authorization token header
  * @returns {RequestResponse.model} 200 - accept response
  * @returns {Error}  default - Unexpected error
  */
  app.put('/:id/join', authRequired(controller.joinActivity));

  /**
  * Joins an activity
  * @route PUT /{id}/join
  * @group Activity - Operations about activity
  * @param {integer} id.path.required - the id of the activity
  * @param {string} authorization.header.required - authorization token header
  * @returns {RequestResponse.model} 200 - accept response
  * @returns {Error}  default - Unexpected error
  */
  app.put('/:id/unjoin', authRequired(controller.unjoinActivity));

  return app;
};

export default getRoutes;

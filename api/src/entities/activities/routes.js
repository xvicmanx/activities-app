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
   * @typedef Activity
   * @property {integer} id
   * @property {string} title.required
   * @property {string} description
   * @property {string} date.required
   * @property {string} createdAt
   * @property {string} updatedAt
   */

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
   * @typedef ActivitiesListResponse
   * @property {boolean} success
   * @property {Activity[]} activities
   */

  /**
   * @typedef ActivityParticipantsListResponse
   * @property {boolean} success
   * @property {ActivityParticipant[]} participants
   */

  /**
   * @typedef JoinActivityResponse
   * @property {boolean} success
   */

  /**
   * @typedef UnjoinActivityResponse
   * @property {boolean} success
   */

  /**
   * @typedef CreateActivityPayload
   * @property {string} title.required
   * @property {string} description.required
   * @property {string} date.required
   */

  /**
   * @typedef CreateActivityResponse
   * @property {boolean} success
   * @property {Activity} activity
   */

  /**
   * @typedef UpdateActivityPayload
   * @property {integer} id.required
   * @property {string} title.required
   * @property {string} description.required
   * @property {string} date.required
   */

  /**
   * @typedef UpdateActivityResponse
   * @property {boolean} success
   * @property {Activity} activity
   */

  /**
   * @typedef DeleteActivityResponse
   * @property {boolean} success
   * @property {Activity} activity
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
  * @route PUT /activities/{id}/join
  * @group Activity - Operations about activity
  * @param {integer} id.path.required - the id of the activity
  * @param {string} authorization.header.required - authorization token header
  * @returns {JoinActivityResponse.model} 200 - unjoin response
  * @returns {Error}  default - Unexpected error
  */
  app.put('/:id/join', authRequired(controller.joinActivity));

  /**
  * Joins an activity
  * @route PUT /activities/{id}/unjoin
  * @group Activity - Operations about activity
  * @param {integer} id.path.required - the id of the activity
  * @param {string} authorization.header.required - authorization token header
  * @returns {JoinActivityResponse.model} 200 - join response
  * @returns {Error}  default - Unexpected error
  */
  app.put('/:id/unjoin', authRequired(controller.unjoinActivity));

  /**
   * Gets the list of activities
   * @route GET /activities/list
   * @group Activity - Operations about activity
   * @param {string} authorization.header.required - authorization token header
   * @returns {ActivitiesListResponse.model} 200 - list of activities response
   * @returns {Error}  default - Unexpected error
   */
  app.get('/list', authRequired(controller.getActivities));

  /**
  * Creates an activity
  * @route POST /activities/create
  * @group Activity - Operations about activity
  * @param {CreateActivityPayload.model} body.body.required - the create activity payload
  * @param {string} authorization.header.required - authorization token header
  * @returns {CreateActivityResponse.model} 200 - create response
  * @returns {Error}  default - Unexpected error
  */
  app.post('/create', authRequired(controller.createActivity));

  /**
  * Updates an activity
  * @route POST /activities/{id}/update
  * @group Activity - Operations about activity
  * @param {integer} id.path.required - the id of the activity
  * @param {UpdateActivityPayload.model} body.body.required - the update activity payload
  * @param {string} authorization.header.required - authorization token header
  * @returns {UpdateActivityResponse.model} 200 - update response
  * @returns {Error}  default - Unexpected error
  */
  app.put('/:id/update', authRequired(controller.updateActivity));

  /**
  * Deletes an activity
  * @route POST /activities/{id}/delete
  * @group Activity - Operations about activity
  * @param {integer} id.path.required - the id of the activity
  * @param {string} authorization.header.required - authorization token header
  * @returns {DeleteActivityResponse.model} 200 - update response
  * @returns {Error}  default - Unexpected error
  */
  app.delete('/:id/delete', authRequired(controller.deleteActivity));

  return app;
};

export default getRoutes;

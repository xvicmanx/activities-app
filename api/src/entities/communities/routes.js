// @flow

import type {
  $Application,
  $Request,
  $Response,
} from 'express';
import express from 'express';

import { authRequired } from '../../helpers';
import CommunitiesController from './controller';
import CommunitiesService from './service';

const getRoutes = () => {
  const app: $Application<$Request, $Response> = express();
  const service = new CommunitiesService();
  const controller = new CommunitiesController(service);

  /**
   * @typedef CommunityMember
   * @property {integer} id
   * @property {string} name
   * @property {string} profileURL
   * @property {boolean} coordinates
   */

  /**
   * @typedef Community
   * @property {integer} id
   * @property {string} name.required
   * @property {string} slogan
   * @property {CommunityMember[]} members
   * @property {string} createdAt
   * @property {string} updatedAt
   */

  /**
   * @typedef CommunitiesResponse
   * @property {boolean} success
   * @property {Community[]} communities
   */

  /**
   * @typedef FindCommunityByIdResponse
   * @property {boolean} success
   * @property {Community} community
   */

  /**
   * @typedef CreateCommunityPayload
   * @property {string} title.required
   * @property {string} description.required
   * @property {string} date.required
   */

  /**
   * @typedef CreateCommunityResponse
   * @property {boolean} success
   * @property {Community} community
   */

  /**
   * @typedef UpdateCommunityPayload
   * @property {integer} id.required
   * @property {string} title.required
   * @property {string} description.required
   * @property {string} date.required
   */

  /**
   * @typedef UpdateCommunityResponse
   * @property {boolean} success
   * @property {Community} community
   */

  /**
   * @typedef DeleteCommunityResponse
   * @property {boolean} success
   * @property {Community} community
   */

  /**
   * @typedef AddMemberToCommunityResponse
   * @property {boolean} success
   * @property {CommunityMember} member
   */

  /**
   * Gets the current user communities
   * @route GET /communities/list-for-user
   * @group Community - Community
   * @param {string} authorization.header.required - authorization token header
   * @returns {PendingCommunitiesResponse.model} 200 - user communities response
   * @returns {Error}  default - Unexpected error
   */
  app.get('/list-for-user', authRequired(controller.getUserCommunities));

  /**
   * Find community by id
   * @route GET /communities/find/{id}
   * @group Community - Operations about community
   * @param {string} id.path.required - user id
   * @param {string} authorization.header.required - authorization token header
   * @returns {FindCommunityByIdResponse.model} 200 - found community response
   * @returns {Error}  default - Unexpected error
   */
  app.get('/find/:id', authRequired(controller.findById));

  /**
   * Gets the list of communities
   * @route GET /communities/list
   * @group Community - Operations about community
   * @param {string} authorization.header.required - authorization token header
   * @returns {CommunitiesResponse.model} 200 - list of communities response
   * @returns {Error}  default - Unexpected error
   */
  app.get('/list', authRequired(controller.getCommunities));

  /**
  * Creates an community
  * @route POST /communities/create
  * @group Community - Operations about community
  * @param {CreateCommunityPayload.model} body.body.required - the create community payload
  * @param {string} authorization.header.required - authorization token header
  * @returns {CreateCommunityResponse.model} 200 - create response
  * @returns {Error}  default - Unexpected error
  */
  app.post('/create', authRequired(controller.createCommunity));

  /**
   * Updates an community
   * @route POST /communities/{id}/update
   * @group Community - Operations about community
   * @param {integer} id.path.required - the id of the community
   * @param {UpdateCommunityPayload.model} body.body.required - the update community payload
   * @param {string} authorization.header.required - authorization token header
   * @returns {UpdateCommunityResponse.model} 200 - update response
   * @returns {Error}  default - Unexpected error
   */
  app.put('/:id/update', authRequired(controller.updateCommunity));

  /**
   * Deletes an community
   * @route POST /communities/{id}/delete
   * @group Community - Operations about community
   * @param {integer} id.path.required - the id of the community
   * @param {string} authorization.header.required - authorization token header
   * @returns {DeleteCommunityResponse.model} 200 - update response
   * @returns {Error}  default - Unexpected error
   */
  app.delete('/:id/delete', authRequired(controller.deleteCommunity));

  /**
   * Adds a member to a communitiy
   * @route POST /communities/{id}/add-member/{memberId}
   * @group Community - Operations about community
   * @param {integer} id.path.required - the id of the community
   * @param {integer} memberId.path.required - the id of the member
   * @param {string} authorization.header.required - authorization token header
   * @returns {AddMemberToCommunityResponse.model} 200 - update response
   * @returns {Error}  default - Unexpected error
   */
  app.post('/:id/add-member/:memberId', authRequired(controller.addMember));

  return app;
};

export default getRoutes;

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

  return app;
};

export default getRoutes;

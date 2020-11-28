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
   * @typedef Community
   * @property {integer} id
   * @property {string} name.required
   * @property {string} slogan
   * @property {User[]} members
   * @property {string} createdAt
   * @property {string} updatedAt
   */

  /**
   * @typedef CommunitiesResponse
   * @property {boolean} success
   * @property {Community[]} communities
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

  return app;
};

export default getRoutes;

// @flow

import type {
  $Request,
  $Response,
} from 'express';
import _ from 'lodash';

import Controller from '../../common/controller';
import CommunitiesService from './service';

class CommunitiesController extends Controller {
  service: CommunitiesService;

  constructor(service: CommunitiesService) {
    super();

    this.service = service;
  }

  getCommunities = this.errorHandler(async (request: $Request, response: $Response) => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      this.invalidParamError(request, response, 'The user is missing');
      return;
    }

    if (!loggedInUser.admin) {
      this.authorizationError(request, response, 'The user is not authorized');
      return;
    }

    const communities = await this.service.getCommunities();

    response.json({
      communities,
      success: true,
    });
  });

  findById = this.errorHandler(async (request: $Request, response: $Response) => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      this.invalidParamError(request, response, 'The user is not logged in');
      return;
    }

    const { params } = request;

    if (!params.id) {
      this.invalidParamError(request, response, 'The "id" param is missing');
      return;
    }

    const community = await this.service.findById(+params.id);

    if (!community) {
      response.status(404).json({
        message: 'Community not Found',
        success: false,
      });
      return;
    }

    if (!community.members.map((u) => u.id).includes(loggedInUser.id)) {
      response.status(401).json({
        message: 'The user does not belong to the community',
        success: false,
      });
      return;
    }

    const item = community.get({ plain: true });

    response.json({
      community: {
        ...item,
        members: item.members.map((user) => ({
          ..._.omit(user, ['UserCommunity']),
          coordinates: _.get(user, 'UserCommunity.coordinates'),
        })),
      },
      success: true,
    });
  });

  getUserCommunities = this.errorHandler(async (request: $Request, response: $Response) => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      this.invalidParamError(request, response, 'The user is missing');
      return;
    }

    const communities = await this.service.getUserCommunities(loggedInUser.id);

    response.json({
      communities,
      success: true,
    });
  });
}

export default CommunitiesController;

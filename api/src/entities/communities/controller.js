// @flow

import type {
  $Request,
  $Response,
} from 'express';
import _ from 'lodash';

import Controller from '../../common/controller';
import { asObject, decode } from '../../helpers';
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

    const { options } = asObject(request.query);
    const queryOptions = options ? JSON.parse(decode(options)) : {};

    const result = await this.service.getCommunities(queryOptions);

    response.json({
      ...queryOptions,
      ...result,
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

    if (!loggedInUser.admin && !community.members.map((u) => u.id).includes(loggedInUser.id)) {
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

  createCommunity = this.errorHandler(async (request: $Request, response: $Response) => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      this.authorizationError(request, response, 'The user is missing');
      return;
    }

    if (!loggedInUser.admin) {
      this.authorizationError(request, response, 'The user is not authorized');
      return;
    }

    const body = asObject(request.body);
    const { name, slogan } = body;

    if (!name) {
      this.invalidParamError(request, response, 'The "name" param is missing');
      return;
    }

    if (!slogan) {
      this.invalidParamError(request, response, 'The "slogan" param is missing');
      return;
    }

    response.json({
      community: await this.service.createCommunity(body),
      success: true,
    });
  });

  updateCommunity = this.errorHandler(async (request: $Request, response: $Response) => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      this.authorizationError(request, response, 'The user is missing');
      return;
    }

    if (!loggedInUser.admin) {
      this.authorizationError(request, response, 'The user is not authorized');
      return;
    }

    if (!request.params.id) {
      this.invalidParamError(request, response, 'The "id" param is missing');
      return;
    }

    const body = asObject(request.body);

    const { name, slogan } = body;

    if (!name) {
      this.invalidParamError(request, response, 'The "name" param is missing');
      return;
    }

    if (!slogan) {
      this.invalidParamError(request, response, 'The "slogan" param is missing');
      return;
    }

    response.json({
      community: await this.service.updateCommunity({
        id: request.params.id,
        ...body,
      }),
      success: true,
    });
  });

  deleteCommunity = this.errorHandler(async (request: $Request, response: $Response) => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      this.authorizationError(request, response, 'The user is missing');
      return;
    }

    if (!loggedInUser.admin) {
      this.authorizationError(request, response, 'The user is not authorized');
      return;
    }

    if (!request.params.id) {
      this.invalidParamError(request, response, 'The "id" param is missing');
      return;
    }

    response.json({
      community: await this.service.deleteCommunity(+request.params.id),
      success: true,
    });
  });

  addMember = this.errorHandler(async (request: $Request, response: $Response) => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      this.authorizationError(request, response, 'The user is missing');
      return;
    }

    if (!loggedInUser.admin) {
      this.authorizationError(request, response, 'The user is not authorized');
      return;
    }

    if (!request.params.id) {
      this.invalidParamError(request, response, 'The "id" param is missing');
      return;
    }

    if (!request.params.memberId) {
      this.invalidParamError(request, response, 'The "memberId" param is missing');
      return;
    }

    const community = await this.service.findById(+request.params.id);

    if (!community) {
      this.invalidParamError(request, response, 'Invalid community id');
      return;
    }

    if (community.members.map((u) => u.id).includes(+request.params.memberId)) {
      response.status(400).json({
        message: 'The user already belongs to the community',
        success: false,
      });
      return;
    }

    const query = asObject(request.query);

    response.json({
      member: await this.service.addMember(
        +request.params.id,
        +request.params.memberId,
        !!(+query.coordinates),
      ),
      success: true,
    });
  });
}

export default CommunitiesController;

// @flow

import type {
  $Request,
  $Response,
} from 'express';

import { invalidParamError } from '../../helpers';
import CommunitiesService from './service';

class CommunitiesController {
  service: CommunitiesService;

  constructor(service: CommunitiesService) {
    this.service = service;
  }

  getUserCommunities = async (request: $Request, response: $Response) => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      invalidParamError(request, response, 'The user is missing');
      return;
    }

    const communities = await this.service.getUserCommunities(loggedInUser.id);

    response.json({
      communities,
      success: true,
    });
  }
}

export default CommunitiesController;

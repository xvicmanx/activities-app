// @flow

import type {
  $Request,
  $Response,
} from 'express';

import Controller from '../../common/controller';
import ActivitiesService from './service';

class ActivitiesController extends Controller {
  service: ActivitiesService;

  constructor(service: ActivitiesService) {
    super();

    this.service = service;
  }

  getActivities = this.errorHandler(async (request: $Request, response: $Response) => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      this.invalidParamError(request, response, 'The user is missing');
      return;
    }

    if (!loggedInUser.admin) {
      this.authorizationError(request, response, 'The user is not authorized');
      return;
    }

    const activities = await this.service.getActivities();

    response.json({
      activities,
      success: true,
    });
  });

  getPendingActivities = this.errorHandler(async (request: $Request, response: $Response) => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      this.invalidParamError(request, response, 'The user is missing');
      return;
    }

    const activities = await this.service.getPendingActivities(loggedInUser.id);

    response.json({
      activities,
      success: true,
    });
  });

  getParticipantsList = this.errorHandler(async (request: $Request, response: $Response) => {
    const { params } = request;

    if (!params.id) {
      this.invalidParamError(request, response, 'The "id" param is missing');
      return;
    }

    response.json({
      participants: await this.service.getParticipantsList(+params.id),
      success: true,
    });
  });

  joinActivity = this.errorHandler(async (request: $Request, response: $Response) => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      this.invalidParamError(request, response, 'The user is missing');
      return;
    }

    const { params } = request;

    if (!params.id) {
      this.invalidParamError(request, response, 'The "id" param is missing');
      return;
    }

    response.json({
      activity: await this.service.joinActivity(+params.id, +loggedInUser.id),
      success: true,
    });
  });

  unjoinActivity = this.errorHandler(async (request: $Request, response: $Response) => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      this.invalidParamError(request, response, 'The user is missing');
      return;
    }

    const { params } = request;

    if (!params.id) {
      this.invalidParamError(request, response, 'The "id" param is missing');
      return;
    }

    response.json({
      activity: await this.service.unjoinActivity(+params.id, +loggedInUser.id),
      success: true,
    });
  });
}

export default ActivitiesController;

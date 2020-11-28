// @flow

import type {
  $Request,
  $Response,
} from 'express';

import { invalidParamError } from '../../helpers';
import ActivitiesService from './service';

class ActivitiesController {
  service: ActivitiesService;

  constructor(service: ActivitiesService) {
    this.service = service;
  }

  getPendingActivities = async (request: $Request, response: $Response) => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      invalidParamError(request, response, 'The user is missing');
      return;
    }

    const activities = await this.service.getPendingActivities(loggedInUser.id);

    response.json({
      activities,
      success: true,
    });
  }

  getParticipantsList = async (request: $Request, response: $Response) => {
    const { params } = request;

    if (!params.id) {
      invalidParamError(request, response, 'The "id" param is missing');
      return;
    }

    response.json({
      participants: await this.service.getParticipantsList(+params.id),
      success: true,
    });
  }
}

export default ActivitiesController;

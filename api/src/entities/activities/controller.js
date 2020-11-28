// @flow

import type {
  $Request,
  $Response,
} from 'express';

import { handleError, invalidParamError } from '../../helpers';
import ActivitiesService from './service';

class ActivitiesController {
  service: ActivitiesService;

  constructor(service: ActivitiesService) {
    this.service = service;
  }

  getPendingActivities = async (request: $Request, response: $Response) => handleError(async () => {
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
  }, response);

  getParticipantsList = async (request: $Request, response: $Response) => handleError(async () => {
    const { params } = request;

    if (!params.id) {
      invalidParamError(request, response, 'The "id" param is missing');
      return;
    }

    response.json({
      participants: await this.service.getParticipantsList(+params.id),
      success: true,
    });
  }, response);

  joinActivity = async (request: $Request, response: $Response) => handleError(async () => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      invalidParamError(request, response, 'The user is missing');
      return;
    }

    const { params } = request;

    if (!params.id) {
      invalidParamError(request, response, 'The "id" param is missing');
      return;
    }

    response.json({
      activity: await this.service.joinActivity(+params.id, +loggedInUser.id),
      success: true,
    });
  }, response);

  unjoinActivity = async (request: $Request, response: $Response) => handleError(async () => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      invalidParamError(request, response, 'The user is missing');
      return;
    }

    const { params } = request;

    if (!params.id) {
      invalidParamError(request, response, 'The "id" param is missing');
      return;
    }

    response.json({
      activity: await this.service.unjoinActivity(+params.id, +loggedInUser.id),
      success: true,
    });
  }, response);
}

export default ActivitiesController;

// @flow

import type {
  $Request,
  $Response,
} from 'express';

import Controller from '../../common/controller';
import PushNotifier from '../../common/push-notifier';
import { asObject, decode } from '../../helpers';
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

    const { options } = asObject(request.query);
    const queryOptions = options ? JSON.parse(decode(options)) : {};

    console.log(queryOptions);

    const result = await this.service.getActivities(queryOptions);

    response.json({
      ...queryOptions,
      ...result,
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
      this.authorizationError(request, response, 'The user is missing');
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
      this.authorizationError(request, response, 'The user is missing');
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

  createActivity = this.errorHandler(async (request: $Request, response: $Response) => {
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
    const {
      title,
      description,
      date,
      communityId,
    } = body;

    if (!title) {
      this.invalidParamError(request, response, 'The "title" param is missing');
      return;
    }

    if (!description) {
      this.invalidParamError(request, response, 'The "description" param is missing');
      return;
    }

    if (!date) {
      this.invalidParamError(request, response, 'The "date" param is missing');
      return;
    }

    if (!communityId) {
      this.invalidParamError(request, response, 'The "communityId" param is missing');
      return;
    }

    const activity = await this.service.createActivity(body);

    await PushNotifier.notify(
      'newActivity',
      {
        message: activity.title,
        title: 'Insiemi App',
        // imageUrl: '<URL>',
      },
    );

    response.json({
      activity,
      success: true,
    });
  });

  updateActivity = this.errorHandler(async (request: $Request, response: $Response) => {
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

    const { title, description, date } = body;

    if (!title) {
      this.invalidParamError(request, response, 'The "title" param is missing');
      return;
    }

    if (!description) {
      this.invalidParamError(request, response, 'The "description" param is missing');
      return;
    }

    if (!date) {
      this.invalidParamError(request, response, 'The "date" param is missing');
      return;
    }

    response.json({
      activity: await this.service.updateActivity({
        id: request.params.id,
        ...body,
      }),
      success: true,
    });
  });

  deleteActivity = this.errorHandler(async (request: $Request, response: $Response) => {
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
      activity: await this.service.deleteActivity(+request.params.id),
      success: true,
    });
  });
}

export default ActivitiesController;

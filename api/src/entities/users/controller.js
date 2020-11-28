// @flow

import type {
  $Request,
  $Response,
} from 'express';

import Controller from '../../common/controller';
import { asObject } from '../../helpers';
import { getSafeUser } from './helpers';
import UsersService from './service';

class UsersController extends Controller {
  service: UsersService;

  constructor(service: UsersService) {
    super();

    this.service = service;
  }

  findById = this.errorHandler(async (request: $Request, response: $Response) => {
    const { params } = request;

    if (!params.id) {
      this.invalidParamError(request, response, 'The "id" param is missing');
      return;
    }

    const user = await this.service.findById(+params.id);

    if (!user) {
      response.status(404).json({
        message: 'User not Found',
        success: false,
      });
      return;
    }

    response.json({
      user: getSafeUser(user),
      success: true,
    });
  });

  current = this.errorHandler(async (request: $Request, response: $Response) => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      this.invalidParamError(request, response, 'The user is missing');
      return;
    }

    const result = await this.service.current(loggedInUser.id);

    response.json({ ...result, success: true });
  });

  login = this.errorHandler(async (request: $Request, response: $Response) => {
    const body = asObject(request.body);

    const { email, password } = body;

    if (!email) {
      this.invalidParamError(request, response, 'The "email" param is missing');
      return;
    }

    if (!password) {
      this.invalidParamError(request, response, 'The "password" param is missing');
      return;
    }

    if (typeof email !== 'string') {
      this.invalidParamError(request, response, 'The "email" must be a string');
      return;
    }

    if (typeof password !== 'string') {
      this.invalidParamError(request, response, 'The "password" must be a string');
      return;
    }

    const result = await this.service.login(
      email,
      password,
    );

    if (!result) {
      this.invalidParamError(request, response, 'Invalid email or password');
      return;
    }

    response.json({ ...result, success: true });
  });
}

export default UsersController;

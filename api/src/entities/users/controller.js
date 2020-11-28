// @flow

import type {
  $Request,
  $Response,
} from 'express';

import { asObject, invalidParamError } from '../../helpers';
import { getSafeUser } from './helpers';
import UsersService from './service';

class UsersController {
  service: UsersService;

  constructor(service: UsersService) {
    this.service = service;
  }

  findById = async (request: $Request, response: $Response) => {
    const { params } = request;

    if (!params.id) {
      invalidParamError(request, response, 'The "id" param is missing');
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
  }

  current = async (request: $Request, response: $Response) => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      invalidParamError(request, response, 'The user is missing');
      return;
    }

    const result = await this.service.current(loggedInUser.id);

    response.json({ ...result, success: true });
  }

  login = async (request: $Request, response: $Response) => {
    const body = asObject(request.body);

    const { email, password } = body;

    if (!email) {
      invalidParamError(request, response, 'The "email" param is missing');
      return;
    }

    if (!password) {
      invalidParamError(request, response, 'The "password" param is missing');
      return;
    }

    if (typeof email !== 'string') {
      invalidParamError(request, response, 'The "email" must be a string');
      return;
    }

    if (typeof password !== 'string') {
      invalidParamError(request, response, 'The "password" must be a string');
      return;
    }

    const result = await this.service.login(
      email,
      password,
    );

    if (!result) {
      invalidParamError(request, response, 'Invalid email or password');
      return;
    }

    response.json({ ...result, success: true });
  }
}

export default UsersController;

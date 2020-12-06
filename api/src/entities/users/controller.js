// @flow

import type {
  $Request,
  $Response,
} from 'express';
import generateHash from 'random-hash';

import Controller from '../../common/controller';
import ImageUploader from '../../common/image-uploader';
import { asObject, decode } from '../../helpers';
import { getSafeUser } from './helpers';
import UsersService from './service';

class UsersController extends Controller {
  service: UsersService;

  constructor(service: UsersService) {
    super();

    this.service = service;
  }

  getUsers = this.errorHandler(async (request: $Request, response: $Response) => {
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
    const result = await this.service.getUsers(queryOptions);

    response.json({
      ...queryOptions,
      ...result,
      success: true,
    });
  });

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

  changePassword = this.errorHandler(async (request: $Request, response: $Response) => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      this.invalidParamError(request, response, 'The user is not signed in');
      return;
    }

    const body = asObject(request.body);

    const { previousPassword, password, confirmPassword } = body;

    if (!previousPassword) {
      this.invalidParamError(request, response, 'The "previousPassword" param is missing');
      return;
    }

    if (!password) {
      this.invalidParamError(request, response, 'The "password" param is missing');
      return;
    }

    if (!confirmPassword) {
      this.invalidParamError(request, response, 'The "confirmPassword" param is missing');
      return;
    }

    if (password !== confirmPassword) {
      this.invalidParamError(request, response, 'The confirm and new password do not match');
      return;
    }

    const success = await this.service.changePassword(
      loggedInUser.id,
      previousPassword,
      password,
    );

    response.json({ success });
  });

  updateInformation = this.errorHandler(async (request: $Request, response: $Response) => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      this.invalidParamError(request, response, 'The user is not signed in');
      return;
    }

    response.json({
      success: await this.service.updateInformation(
        loggedInUser.id,
        asObject(request.body),
      ),
    });
  });

  updateProfilePicture = this.errorHandler(async (request: $Request, response: $Response) => {
    const loggedInUser: Object | null = response.locals.user || null;

    if (!loggedInUser || !loggedInUser.id) {
      this.invalidParamError(request, response, 'The user is not signed in');
      return;
    }

    // $FlowFixMe
    if (!request.file) {
      this.invalidParamError(request, response, 'Profile image not sent');
      return;
    }

    const hash = generateHash({ length: 16 });
    // $FlowFixMe
    const fileExt = request.file.originalname.split('.').pop();

    const profileURL = await ImageUploader.upload(
      // $FlowFixMe
      request.file.buffer,
      `${loggedInUser.id}-${hash}.${fileExt}`,
    );

    response.json({
      success: await this.service.updateProfilePictureURL(
        loggedInUser.id,
        profileURL,
      ),
      profileURL,
    });
  });

  createUser = this.errorHandler(async (request: $Request, response: $Response) => {
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
      name,
      email,
      description,
      password,
    } = body;

    if (!name) {
      this.invalidParamError(request, response, 'The "name" param is missing');
      return;
    }

    if (!email) {
      this.invalidParamError(request, response, 'The "email" param is missing');
      return;
    }

    if (!description) {
      this.invalidParamError(request, response, 'The "description" param is missing');
      return;
    }

    if (!password) {
      this.invalidParamError(request, response, 'The "password" param is missing');
      return;
    }

    response.json({
      user: getSafeUser(await this.service.createUser(body)),
      success: true,
    });
  });

  updateUser = this.errorHandler(async (request: $Request, response: $Response) => {
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

    const { name, email, description } = body;

    if (!name) {
      this.invalidParamError(request, response, 'The "name" param is missing');
      return;
    }

    if (!email) {
      this.invalidParamError(request, response, 'The "email" param is missing');
      return;
    }

    if (!description) {
      this.invalidParamError(request, response, 'The "description" param is missing');
      return;
    }

    response.json({
      user: getSafeUser(await this.service.updateUser({
        id: request.params.id,
        ...body,
      })),
      success: true,
    });
  });

  deleteUser = this.errorHandler(async (request: $Request, response: $Response) => {
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
      user: getSafeUser(await this.service.deleteUser(+request.params.id)),
      success: true,
    });
  });
}

export default UsersController;

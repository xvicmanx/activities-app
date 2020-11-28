/* eslint-disable max-classes-per-file */
// @flow

import type {
  $Request,
  $Response,
} from 'express';
import _ from 'lodash';

import UsersService from './entities/users/service';

const extractTokenFromRequest = (req: $Request) => _.get(
  req,
  'headers.authorization',
  '',
).replace('Bearer ', '');

export const getLoggedInUser = (req: $Request) => {
  const service = new UsersService();
  const token = extractTokenFromRequest(req);

  if (!token) {
    return null;
  }

  return service.findByToken(token);
};

export const authRequired = (cb: Function) => (req: $Request, res: $Response, next: Function) => {
  if (!res.locals.user) {
    res.status(401).json({
      message: 'It is not authorized',
      code: 'NOT_AUTHORIZED',
    });
  } else {
    cb(req, res, next);
  }
};

export const invalidParamError = (req: $Request, res: $Response, message: string) => {
  res.status(400).json({
    message: `Invalid parameters: ${message}`,
    code: 'INVALID_PARAMETERS',
  });
};

export const asObject = (target: mixed): Object => ((target !== null && typeof target === 'object')
  ? target : {});

export class ValidationError extends Error {
  code: string;

  status: number;

  constructor(code: string, message: string = '') {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
    this.code = code;
  }
}

export class NotFoundError extends Error {
  code: string;

  status: number;

  constructor(message: string = '') {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
    this.code = 'NOT_FOUND';
  }
}

export const throwValidationError = (param: string, extraMessage: string = '') => {
  throw new ValidationError(param, extraMessage);
};

export const throwNotFoundError = (message: string) => {
  throw new ValidationError(message);
};


export const handleError = async (fn: Function, response: $Response) => {
  try {
    await fn();
  } catch (err) {
    response.status(err.status || 500).json({
      message: err.status ? err.message : 'UnexpectedError',
    });
  }
};

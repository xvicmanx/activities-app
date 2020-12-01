/* eslint-disable max-classes-per-file */
// @flow

/**
 * @module helpers
 */

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

/**
 * Gets the logged in user using the JWT token
 * @name getLoggedInUser
 * @param {$Response} res - Express response
 * @return {User} logged in user
 */
export const getLoggedInUser = (req: $Request) => {
  const service = new UsersService();
  const token = extractTokenFromRequest(req);

  if (!token) {
    return null;
  }

  return service.findByToken(token);
};

/**
 * Wrapper to make a request auth dependant.
 * If the user is not signed in it will throw 401 error
 * @name authRequired
 * @param {Function} cb - function to wrap
 */
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

/**
 * Throw a invalid param error with a 400 status
 * @name invalidParamError
 * @param {$Request} req - Express request
 * @param {$Response} res - Express response
 * @param {string} message - message of the error
 */
export const invalidParamError = (req: $Request, res: $Response, message: string) => {
  res.status(400).json({
    message: `Invalid parameters: ${message}`,
    code: 'INVALID_PARAMETERS',
  });
};

/**
 * Transforms a target to object in case of not being
 * @name asObject
 * @param {mixed} target - target item
 * @return {Object} result
 */
export const asObject = (target: mixed): Object => ((target !== null && typeof target === 'object')
  ? target : {});

/**
 * Errors related to Validation
 * @name ValidationError
 */
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

/**
 * Errors related to not found objects
 * @name NotFoundError
 */
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

/**
 * Throws a validation error
 * @name throwValidationError
 * @throws {ValidationError}
 * @param {string} param - param name
 * @param {string} extraMessage - additional message
 */
export const throwValidationError = (param: string, extraMessage: string = '') => {
  throw new ValidationError(param, extraMessage);
};

/**
 * Throws a validation error
 * @name throwNotFoundError
 * @throws {NotFoundError}
 * @param {string} message - error message
 */
export const throwNotFoundError = (message: string) => {
  throw new NotFoundError(message);
};

/**
 * Handles error returning the correct status
 * @name errorHandler
 * @param {Function} fn - Funtion to handle errors
 */
export const errorHandler = (fn: Function) => async (req: $Request, res: $Response) => {
  try {
    const result = await fn(req, res);
    return result;
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.status ? err.message : 'Unexpected error',
    });
    return null;
  }
};

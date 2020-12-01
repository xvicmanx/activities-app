// @flow

import type {
  $Application,
  $Request,
  $Response,
} from 'express';
import express from 'express';
import multer from 'multer';

import { authRequired } from '../../helpers';
import UsersController from './controller';
import UsersService from './service';

const getRoutes = () => {
  const app: $Application<$Request, $Response> = express();
  const service = new UsersService();
  const controller = new UsersController(service);

  /**
   * @typedef User
   * @property {integer} id
   * @property {string} name.required
   * @property {string} profileURL
   * @property {string} description
   * @property {string} email.required
   * @property {string} createdAt
   * @property {string} updatedAt
   */

  /**
   * @typedef FindUserByIdResponse
   * @property {boolean} success
   * @property {User} user
   */

  /**
   * @typedef UserLoginPayload
   * @property {string} email
   * @property {string} password
   */

  /**
   * @typedef UserSignResponse
   * @property {boolean} success
   * @property {User.model} user
   * @property {string} token
   * @property {integer} ext
   */

  /**
   * @typedef ChangePasswordPayload
   * @property {string} previousPassword
   * @property {string} password
   * @property {string} confirmPassword
   */

  /**
   * @typedef ChangePasswordResponse
   * @property {boolean} success
   */

  /**
   * @typedef UpdateInformationPayload
   * @property {string} description
   */

  /**
   * @typedef UpdateInformationResponse
   * @property {boolean} success
   */

  /**
   * @typedef UpdateProfilePictureResponse
   * @property {boolean} success
   * @property {string} profileURL
   */

  /**
   * Get current user
   * @route GET /users/current
   * @group User - Operations about user
   * @param {string} authorization.header.required - authorization token header
   * @returns {UserSignResponse.model} 200 - user response
   * @returns {Error}  default - Unexpected error
   */
  app.get('/current', authRequired(controller.current));

  /**
   * Find user by id
   * @route GET /users/find/{id}
   * @group User - Operations about user
   * @param {string} id.path.required - user id
   * @param {string} authorization.header.required - authorization token header
   * @returns {FindUserByIdResponse.model} 200 - found user response
   * @returns {Error}  default - Unexpected error
   */
  app.get('/find/:id', authRequired(controller.findById));

  /**
  * Signs in an user
  * @route POST /users/login
  * @group User - Operations about user
  * @param {UserLoginPayload.model} body.body.required - the login payload
  * @returns {UserSignResponse.model} 200 - login response
  * @returns {Error}  default - Unexpected error
  */
  app.post('/login', controller.login);

  /**
  * Changes the password of the signed in user
  * @route PUT /users/change-password
  * @group User - Operations about user
  * @param {ChangePasswordPayload.model} body.body.required - the change password payload
  * @returns {ChangePasswordResponse.model} 200 - change password response
  * @returns {Error}  default - Unexpected error
  */
  app.put('/change-password', authRequired(controller.changePassword));

  /**
  * Updates information of the signed in user
  * @route PUT /users/update-information
  * @group User - Operations about user
  * @param {UpdateInformationPayload.model} body.body.required - the update information payload
  * @returns {UpdateInformationResponse.model} 200 - update information response
  * @returns {Error}  default - Unexpected error
  */
  app.put('/update-information', authRequired(controller.updateInformation));

  /**
  * Updates the profile picture of the signed in user
  * @route PUT /users/update-profile-picture
  * @group User - Operations about user
  * @param {Object} body.body.required - image data
  * @returns {UpdateProfilePictureResponse.model} 200 - update picture response
  * @returns {Error}  default - Unexpected error
  */
  app.put(
    '/update-profile-picture',
    multer().single('file'),
    authRequired(controller.updateProfilePicture),
  );

  return app;
};

export default getRoutes;

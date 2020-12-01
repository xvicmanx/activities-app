import { errorHandler, invalidParamError } from '../helpers';

/**
 * All the controllers extend from this class
*/
class Controller {
  /**
   * @method invalidParamError
   * Throws a invalid param error
   */
  invalidParamError = (...args) => invalidParamError(...args);

  /**
   * @method errorHandler
   * Handles error safely and returns the corresponding error status
   */
  errorHandler = (...args) => errorHandler(...args);
}

export default Controller;

import { errorHandler, invalidParamError } from '../helpers';

class Controller {
  invalidParamError = (...args) => invalidParamError(...args);

  errorHandler = (...args) => errorHandler(...args);
}

export default Controller;

import { HANDLE_CHANGE } from './LoginFormActionTypes';

export const INITIAL_STATE = {
  email: '',
  password: '',
};

const LoginFormReducer = (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    case HANDLE_CHANGE:
      return {
        ...state,
        [payload.name]: payload.value,
      };

    default:
      return state;
  }
};

export default LoginFormReducer;

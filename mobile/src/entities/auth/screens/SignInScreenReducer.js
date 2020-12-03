export const HANDLE_CHANGE = 'HANDLE_CHANGE';
export const SET_ERRORS = 'SET_ERRORS';

export const initialState = {
  email: '',
  password: '',
  errors: {
    email: null,
    password: null,
  },
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case HANDLE_CHANGE:
      return {
        ...state,
        [payload.name]: payload.value,
        errors: {
          ...state.errors,
          [payload.name]: null,
        },
      };

    case SET_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          [payload.name]: payload.value,
        },
      };

    default:
      return state;
  }
};

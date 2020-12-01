export const HANDLE_CHANGE = 'HANDLE_CHANGE';
export const EDIT_PASSWORD = 'EDIT_PASSWORD';

export const initialState = {
  currentPassword: '',
  nextPassword: '',
  confirmNextPassword: '',
  isEditing: false,
  errors: {
    currentPassword: null,
    nextPassword: null,
    confirmNextPassword: null,
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

    case EDIT_PASSWORD:
      return {
        ...state,
        isEditing: !state.isEditing,
      };

    default:
      return state;
  }
};

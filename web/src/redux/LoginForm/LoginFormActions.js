import { HANDLE_CHANGE } from './LoginFormActionTypes';

export const handleChange = (e) => (dispatch) => {
  const { name, value } = e.target;

  dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
};

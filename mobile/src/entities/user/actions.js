import UserService from './userService';
import userSlice from './userSlice';
import { updateDescription as updateDescriptionAction } from '../../common/actions';

export const updatePassword = (passwordsData, token) => async (dispatch) => {
  dispatch(userSlice.actions.setLoading(true));

  try {
    const res = await UserService.updatePassword(passwordsData, token);

    if (!res.success) {
      dispatch(
        userSlice.actions.setMessage({
          visibility: true,
          success: false,
          text: 'No se pudo cambiar la contraseña',
        })
      );
      return;
    }

    dispatch(
      userSlice.actions.setMessage({
        visibility: true,
        success: true,
        text: 'Su contraseña ha sido cambiada con exito',
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateDescription = (description, token) => async (dispatch) => {
  dispatch(userSlice.actions.setModalLoader(true));

  try {
    const res = await UserService.updateDescription(description, token);

    if (res.success) {
      dispatch(updateDescriptionAction(description));
    }
  } catch (error) {
    console.log(error);
  }
};
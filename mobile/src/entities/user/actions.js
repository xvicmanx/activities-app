import UserService from './userService';
import userSlice from './userSlice';

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

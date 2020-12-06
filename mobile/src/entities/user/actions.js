import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from './user.service';
// import userSlice from './user.slice';

export const fetUserById = createAsyncThunk('user/fetUserById', async (userId, thunkAPI) => {
  const token = thunkAPI.getState().auth.currentUser.token;
  const res = await UserService.fetUserById(userId, token);

  if (res.success) {
    return res.user;
  }
});

// export const updatePassword = (passwordsData, token) => async (dispatch) => {
//   dispatch(userSlice.actions.setLoading(true));

//   try {
//     const res = await UserService.updatePassword(passwordsData, token);

//     if (!res.success) {
//       dispatch(
//         userSlice.actions.setMessage({
//           visibility: true,
//           success: false,
//           text: 'No se pudo cambiar la contraseña',
//         })
//       );
//       return;
//     }

//     dispatch(
//       userSlice.actions.setMessage({
//         visibility: true,
//         success: true,
//         text: 'Su contraseña ha sido cambiada con exito',
//       })
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updateDescription = (description, token) => async (dispatch) => {
//   dispatch(userSlice.actions.setModalLoader(true));

//   try {
//     const res = await UserService.updateDescription(description, token);

//     if (res.success) {
//       dispatch(updateDescriptionAction(description));
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const updateImage = createAsyncThunk('user/uploadImage', async (imageData, thunkAPI) => {
  const token = thunkAPI.getState().auth.currentUser.token;
  const res = await UserService.uploadImage(imageData, token);

  if (res.success) {
    return res.profileURL;
  }
});

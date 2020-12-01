import UserService from './userService';

export const updatePassword = (user) => async (dispatch) => {
  try {
    const res = await UserService.updatePassword(user);

    console.log(res);

    // if (res.success) {
    //   dispatch(communitiesSlice.actions.setCommunities(res.communities));
    // }
  } catch (error) {
    console.log(error);
  }
};

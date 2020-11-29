// @flow

export const getSafeUser = (user: Object) => Object.keys((user.toJSON ? user.toJSON() : user) || {})
  .filter((key) => key !== 'password')
  .reduce((acc, key) => ({
    ...acc,
    [key]: user[key],
  }), {});

export default {
  getSafeUser,
};

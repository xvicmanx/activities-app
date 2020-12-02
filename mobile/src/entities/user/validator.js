import { ERRORS } from '../../constants';

export default (data) => {
  const errors = {};

  if (!data.previousPassword) {
    errors.previousPassword = ERRORS.empty;
  } else if (data.password.length < 6) {
    errors.password = ERRORS.password.lessThanSixCharacters;
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = ERRORS.password.dontMatch;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

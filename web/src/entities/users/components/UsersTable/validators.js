// @flow

export const createFormValidator = (values: Object): Object => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Por favor, provea un nombre';
  }

  if (!values.email) {
    errors.email = 'Por favor, provea un correo';
  }

  if (!values.description) {
    errors.description = 'Por favor, provea un Descripción';
  }

  return errors;
};

export const updateFormValidator = (values: Object): Object => {
  const errors = {};

  if (!values.id) {
    errors.id = 'Por favor, provea el id';
  }

  if (!values.email) {
    errors.email = 'Por favor, provea un correo';
  }

  if (!values.name) {
    errors.name = 'Por favor, provea un nombre';
  }

  if (!values.description) {
    errors.description = 'Por favor, provea un Descripción';
  }

  return errors;
};

export const deleteFormValidator = (values: Object): Object => {
  const errors = {};

  if (!values.id) {
    errors.id = 'Por favor, provea el id';
  }

  return errors;
};

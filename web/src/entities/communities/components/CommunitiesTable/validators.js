export const createFormValidator = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Por favor, provea un nombre';
  }

  if (!values.slogan) {
    errors.slogan = 'Por favor, provea un eslogan';
  }

  return errors;
};

export const updateFormValidator = (values) => {
  const errors = {};

  if (!values.id) {
    errors.id = 'Por favor, provea el id';
  }

  if (!values.name) {
    errors.name = 'Por favor, provea un nombre';
  }

  if (!values.slogan) {
    errors.slogan = 'Por favor, provea un eslogan';
  }

  return errors;
};

export const deleteFormValidator = (values) => {
  const errors = {};

  if (!values.id) {
    errors.id = 'Por favor, provea el id';
  }

  return errors;
};

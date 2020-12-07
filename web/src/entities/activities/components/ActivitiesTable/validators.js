export const deleteFormValidator = (values) => {
  const errors = {};

  if (!values.id) {
    errors.id = 'Por favor, provea el id';
  }

  return errors;
};

export const updateFormValidator = (values) => {
  const errors = {};

  if (!values.id) {
    errors.id = 'Por favor, provea el id';
  }

  if (!values.title) {
    errors.title = 'Por favor, provea un título';
  }

  if (!values.description) {
    errors.description = 'Por favor, provea una Descripción';
  }

  if (!values.date) {
    errors.date = 'Por favor, provea una fecha';
  }

  return errors;
};


export const createFormValidator = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Por favor, provea un título';
  }

  if (!values.description) {
    errors.description = 'Por favor, provea una Descripción';
  }

  if (!values.date) {
    errors.date = 'Por favor, provea una fecha';
  }

  if (!values.communityId) {
    errors.communityId = 'Por favor, seleccione una comunidad';
  }

  return errors;
};

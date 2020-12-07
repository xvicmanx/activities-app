// @flow

export const addMemberFormValidator = (members: Array<Object>): ((values: any) => any) => (values: Object): Object => {
  const errors = {};

  if (!values.memberId) {
    errors.memberId = 'Por favor, seleccione miembro';
  }

  if (members.map((x) => x.id).includes(values.memberId)) {
    errors.memberId =
      'El miembro seleccionado ya existe en la comunidad';
  }

  return errors;
};

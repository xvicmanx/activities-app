import {
  createFormValidator,
  updateFormValidator,
  deleteFormValidator,
} from './validators';

describe('CommunitiesTable validators', () => {
  describe('createFormValidator', () => {
    it('does not return messages when the values provided are valid', async () => {
      const errors = createFormValidator({
        name: 'Test Community',
        slogan: 'We are a family',
      });
      expect(errors).toEqual({});
    });

    it('does return error messages when name is missing', async () => {
      const errors = createFormValidator({
        slogan: 'We are a family',
      });
      expect(errors).toEqual({ name: 'Por favor, provea un nombre' });
    });

    it('does return error messages when slogan is missing', async () => {
      const errors = createFormValidator({
        name: 'Test Community',
      });
      expect(errors).toEqual({ slogan: 'Por favor, provea un eslogan' });
    });
  });

  describe('updateFormValidator', () => {
    it('does not return messages when the values provided are valid', async () => {
      const errors = updateFormValidator({
        id: 1,
        name: 'Test Community',
        slogan: 'We are a family',
      });
      expect(errors).toEqual({});
    });

    it('does return error messages when name is missing', async () => {
      const errors = updateFormValidator({
        id: 1,
        slogan: 'We are a family',
      });
      expect(errors).toEqual({ name: 'Por favor, provea un nombre' });
    });

    it('does return error messages when slogan is missing', async () => {
      const errors = updateFormValidator({
        id: 1,
        name: 'Test Community',
      });
      expect(errors).toEqual({ slogan: 'Por favor, provea un eslogan' });
    });

    it('does return error messages when id is missing', async () => {
      const errors = updateFormValidator({
        name: 'Test Community',
        slogan: 'We are a family',
      });
      expect(errors).toEqual({ id: 'Por favor, provea el id' });
    });
  });

  describe('deleteFormValidator', () => {
    it('does not return messages when the values provided are valid', async () => {
      const errors = deleteFormValidator({
        id: 1,
      });
      expect(errors).toEqual({});
    });

    it('does return error messages when id is missing', async () => {
      const errors = deleteFormValidator({});
      expect(errors).toEqual({ id: 'Por favor, provea el id' });
    });
  });
});

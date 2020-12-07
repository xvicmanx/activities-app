import {
  createFormValidator,
  updateFormValidator,
  deleteFormValidator,
} from './validators';

describe('UsersTable validators', () => {
  describe('createFormValidator', () => {
    it('does not return messages when the values provided are valid', async () => {
      const errors = createFormValidator({
        name: 'john',
        email: 'test-slogan@test.com',
        description: 'Hello my friend!',
      });
      expect(errors).toEqual({});
    });

    it('does return error messages when name is missing', async () => {
      const errors = createFormValidator({
        email: 'test-slogan@test.com',
        description: 'Hello my friend!',
      });
      expect(errors).toEqual({ name: 'Por favor, provea un nombre' });
    });

    it('does return error messages when email is missing', async () => {
      const errors = createFormValidator({
        name: 'john',
        description: 'Hello my friend!',
      });
      expect(errors).toEqual({ email: 'Por favor, provea un correo' });
    });

    it('does return error messages when description is missing', async () => {
      const errors = createFormValidator({
        name: 'john',
        email: 'test-slogan@test.com',
      });
      expect(errors).toEqual({ description: 'Por favor, provea un Descripción' });
    });
  });

  describe('updateFormValidator', () => {
    it('does not return messages when the values provided are valid', async () => {
      const errors = updateFormValidator({
        id: 1,
        name: 'john',
        email: 'test-slogan@test.com',
        description: 'Hello my friend!',
      });
      expect(errors).toEqual({});
    });

    it('does return error messages when name is missing', async () => {
      const errors = updateFormValidator({
        id: 1,
        email: 'test-slogan@test.com',
        description: 'Hello my friend!',
      });
      expect(errors).toEqual({ name: 'Por favor, provea un nombre' });
    });

    it('does return error messages when email is missing', async () => {
      const errors = updateFormValidator({
        id: 1,
        name: 'john',
        description: 'Hello my friend!',
      });
      expect(errors).toEqual({ email: 'Por favor, provea un correo' });
    });

    it('does return error messages when description is missing', async () => {
      const errors = updateFormValidator({
        id: 1,
        name: 'john',
        email: 'test-slogan@test.com',
      });
      expect(errors).toEqual({ description: 'Por favor, provea un Descripción' });
    });

    it('does return error messages when id is missing', async () => {
      const errors = updateFormValidator({
        name: 'john',
        email: 'test-slogan@test.com',
        description: 'Hello my friend!',
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

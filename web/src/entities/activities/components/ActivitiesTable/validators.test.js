import {
  createFormValidator,
  updateFormValidator,
  deleteFormValidator,
} from './validators';

describe('ActivitiesTable validators', () => {
  describe('createFormValidator', () => {
    it('does not return messages when the values provided are valid', async () => {
      const errors = createFormValidator({
        title: 'Awesome party',
        description: 'Come and join us',
        communityId: 1,
        date: '10-01-2021 10:00',
      });
      expect(errors).toEqual({});
    });

    it('does return error messages when title is missing', async () => {
      const errors = createFormValidator({
        description: 'Come and join us',
        communityId: 1,
        date: '10-01-2021 10:00',
      });
      expect(errors).toEqual({ title: 'Por favor, provea un título' });
    });

    it('does return error messages when description is missing', async () => {
      const errors = createFormValidator({
        title: 'Awesome party',
        communityId: 1,
        date: '10-01-2021 10:00',
      });
      expect(errors).toEqual({
        description: 'Por favor, provea una Descripción',
      });
    });

    it('does return error messages when communityId is missing', async () => {
      const errors = createFormValidator({
        title: 'Awesome party',
        description: 'Come and join us',
        date: '10-01-2021 10:00',
      });
      expect(errors).toEqual({
        communityId: 'Por favor, seleccione una comunidad',
      });
    });
    it('does return error messages when date is missing', async () => {
      const errors = createFormValidator({
        title: 'Awesome party',
        description: 'Come and join us',
        communityId: 1,
      });
      expect(errors).toEqual({ date: 'Por favor, provea una fecha' });
    });
  });

  describe('updateFormValidator', () => {
    it('does not return messages when the values provided are valid', async () => {
      const errors = updateFormValidator({
        id: 1,
        title: 'Awesome party',
        description: 'Come and join us',
        date: '10-01-2021 10:00',
      });
      expect(errors).toEqual({});
    });

    it('does return error messages when title is missing', async () => {
      const errors = updateFormValidator({
        id: 1,
        description: 'Come and join us',
        date: '10-01-2021 10:00',
      });
      expect(errors).toEqual({ title: 'Por favor, provea un título' });
    });

    it('does return error messages when description is missing', async () => {
      const errors = updateFormValidator({
        id: 1,
        title: 'Awesome party',
        date: '10-01-2021 10:00',
      });
      expect(errors).toEqual({
        description: 'Por favor, provea una Descripción',
      });
    });

    it('does return error messages when date is missing', async () => {
      const errors = updateFormValidator({
        id: 1,
        title: 'Awesome party',
        description: 'Come and join us',
      });
      expect(errors).toEqual({ date: 'Por favor, provea una fecha' });
    });

    it('does return error messages when id is missing', async () => {
      const errors = updateFormValidator({
        title: 'Awesome party',
        description: 'Come and join us',
        date: '10-01-2021 10:00',
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

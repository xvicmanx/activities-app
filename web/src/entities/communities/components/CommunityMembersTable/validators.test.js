import { addMemberFormValidator } from './validators';

describe('CommunityMembersTable validators', () => {
  const members = [
    {
      id: 1,
      name: 'John',
    },
  ];

  describe('addMemberFormValidator', () => {
    it('does not return messages when the values provided are valid', async () => {
      const errors = addMemberFormValidator(members)({
        memberId: 2,
      });
      expect(errors).toEqual({});
    });

    it('does return error messages when memberId is missing', async () => {
      const errors = addMemberFormValidator(members)({});
      expect(errors).toEqual({ memberId: 'Por favor, seleccione miembro' });
    });

    it('does return error messages when memberId is already present', async () => {
      const errors = addMemberFormValidator(members)({
        memberId: 1,
      });
      expect(errors).toEqual({ memberId: 'El miembro seleccionado ya existe en la comunidad' });
    });
  });
});

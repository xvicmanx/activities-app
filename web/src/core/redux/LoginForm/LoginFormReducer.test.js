import LoginFormReducer, { INITIAL_STATE } from './LoginFormReducer';

describe('LoginFormReducer', () => {
  it('returns properly for the SET_USERS_LOADING_STATE type', () => {
    const result = LoginFormReducer(INITIAL_STATE, {
      type: 'HANDLE_CHANGE',
      payload: {
        name: 'email',
        value: 'foo@test.com',
      },
    });
    expect(result).toEqual({
      ...INITIAL_STATE,
      email: 'foo@test.com',
    });
  });

  it('returns properly for an unknown a type', () => {
    const result = LoginFormReducer(INITIAL_STATE, {
      type: 'UNKNOWN',
    });
    expect(result).toEqual(INITIAL_STATE);
  });

  it('returns the expected default state', () => {
    const result = LoginFormReducer();
    expect(result).toEqual(INITIAL_STATE);
  });
});

import UsersReducer, { INITIAL_STATE } from './UsersReducer';

describe('UsersReducer', () => {
  it('returns properly for the SET_USERS_LOADING_STATE type', () => {
    let result = UsersReducer(INITIAL_STATE, {
      type: 'SET_USERS_LOADING_STATE',
      payload: true,
    });
    expect(result).toEqual({
      ...INITIAL_STATE,
      loading: true,
    });

    result = UsersReducer(INITIAL_STATE, {
      type: 'SET_USERS_LOADING_STATE',
      payload: false,
    });
    expect(result).toEqual({
      ...INITIAL_STATE,
      loading: false,
    });
  });

  it('returns properly for the SET_USER_ERROR type', () => {
    let result = UsersReducer(INITIAL_STATE, {
      type: 'SET_USER_ERROR',
      payload: 'test-error',
    });
    expect(result).toEqual({
      ...INITIAL_STATE,
      error: 'test-error',
    });
  });

  it('returns properly for the SET_USERS_ERROR type', () => {
    let result = UsersReducer(INITIAL_STATE, {
      type: 'SET_USERS_ERROR',
      payload: 'test-error',
    });
    expect(result).toEqual({
      ...INITIAL_STATE,
      error: 'test-error',
    });
  });

  it('returns properly for the SET_CURRENT_USER type', () => {
    let result = UsersReducer(INITIAL_STATE, {
      type: 'SET_CURRENT_USER',
      payload: {
        id: 1,
        name: 'John',
      },
    });
    expect(result).toEqual({
      ...INITIAL_STATE,
      data: {
        id: 1,
        name: 'John',
      },
    });
  });

  it('returns properly for the SET_USERS type', () => {
    let result = UsersReducer(INITIAL_STATE, {
      type: 'SET_USERS',
      payload: [
        {
          id: 1,
          name: 'John',
        },
      ],
    });
    expect(result).toEqual({
      ...INITIAL_STATE,
      users: [
        {
          id: 1,
          name: 'John',
        },
      ],
    });
  });

  it('returns properly for the LOG_OUT_CURRENT_USER type', () => {
    let result = UsersReducer(INITIAL_STATE, {
      type: 'LOG_OUT_CURRENT_USER',
    });
    expect(result).toEqual(INITIAL_STATE);
  });

  it('returns properly for an unknown a type', () => {
    let result = UsersReducer(INITIAL_STATE, {
      type: 'UNKNOWN',
    });
    expect(result).toEqual(INITIAL_STATE);
  });

  it('returns the expected default state', () => {
    let result = UsersReducer();
    expect(result).toEqual(INITIAL_STATE);
  });
});

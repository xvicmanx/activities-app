import CommunitiesReducer, { INITIAL_STATE } from './CommunitiesReducer';

describe('CommunitiesReducer', () => {
  it('returns properly for the SET_COMMUNITIES_LOADING_STATE type', () => {
    let result = CommunitiesReducer(INITIAL_STATE, {
      type: 'SET_COMMUNITIES_LOADING_STATE',
      payload: true,
    });
    expect(result).toEqual({
      ...INITIAL_STATE,
      loading: true,
    });

    result = CommunitiesReducer(INITIAL_STATE, {
      type: 'SET_COMMUNITIES_LOADING_STATE',
      payload: false,
    });
    expect(result).toEqual({
      ...INITIAL_STATE,
      loading: false,
    });
  });

  it('returns properly for the SET_COMMUNITY_LOADING_STATE type', () => {
    let result = CommunitiesReducer(INITIAL_STATE, {
      type: 'SET_COMMUNITY_LOADING_STATE',
      payload: true,
    });
    expect(result).toEqual({
      ...INITIAL_STATE,
      loading: true,
    });

    result = CommunitiesReducer(INITIAL_STATE, {
      type: 'SET_COMMUNITY_LOADING_STATE',
      payload: false,
    });
    expect(result).toEqual({
      ...INITIAL_STATE,
      loading: false,
    });
  });

  it('returns properly for the SET_COMMUNITY_ERROR type', () => {
    let result = CommunitiesReducer(INITIAL_STATE, {
      type: 'SET_COMMUNITY_ERROR',
      payload: 'test-error',
    });
    expect(result).toEqual({
      ...INITIAL_STATE,
      error: 'test-error',
    });
  });

  it('returns properly for the SET_COMMUNITIES_ERROR type', () => {
    let result = CommunitiesReducer(INITIAL_STATE, {
      type: 'SET_COMMUNITIES_ERROR',
      payload: 'test-error',
    });
    expect(result).toEqual({
      ...INITIAL_STATE,
      error: 'test-error',
    });
  });

  it('returns properly for the SET_COMMUNITIES type', () => {
    let result = CommunitiesReducer(INITIAL_STATE, {
      type: 'SET_COMMUNITIES',
      payload: [
        {
          id: 1,
          name: 'Foo',
        },
      ],
    });
    expect(result).toEqual({
      ...INITIAL_STATE,
      communities: [
        {
          id: 1,
          name: 'Foo',
        },
      ],
    });
  });

  it('returns properly for the SET_COMMUNITY type', () => {
    let result = CommunitiesReducer(INITIAL_STATE, {
      type: 'SET_COMMUNITY',
      payload: {
        id: 1,
        name: 'Foo',
      },
    });
    expect(result).toEqual({
      ...INITIAL_STATE,
      community: {
        id: 1,
        name: 'Foo',
      },
    });
  });

  it('returns properly for the ADD_MEMBER type', () => {
    let result = CommunitiesReducer(
      {
        ...INITIAL_STATE,
        community: {
          id: 1,
          name: 'Foo',
        },
      },
      {
        type: 'ADD_MEMBER',
        payload: {
          id: 1,
          name: 'John',
        },
      }
    );
    expect(result).toEqual({
      ...INITIAL_STATE,
      community: {
        id: 1,
        name: 'Foo',
        members: [
          {
            id: 1,
            name: 'John',
          },
        ],
      },
    });
  });

  it('returns properly for an unknown a type', () => {
    let result = CommunitiesReducer(INITIAL_STATE, {
      type: 'UNKNOWN',
    });
    expect(result).toEqual(INITIAL_STATE);
  });

  it('returns the expected default state', () => {
    let result = CommunitiesReducer();
    expect(result).toEqual(INITIAL_STATE);
  });
});

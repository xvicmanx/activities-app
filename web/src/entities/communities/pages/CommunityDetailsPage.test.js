import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CommunityDetailsPage from './CommunityDetailsPage';

jest.mock('./useCommunity');
jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: 1 }),
  Link: () => 'Link',
}));

import useCommunity from './useCommunity';

describe('CommunityDetailsPage', () => {
  beforeEach(() => {
    useCommunity.mockClear();
  });

  it('renders properly when community available', () => {
    const community = {
      id: 1,
      name: 'Test community',
      members: [{
        id: 2,
        name: 'John',
      }]
    };
    const renderer = new ShallowRenderer();
    
    useCommunity.mockImplementation(() => community);

    const result = renderer.render(<CommunityDetailsPage />);

    expect(useCommunity).toHaveBeenCalledTimes(1);
    expect(useCommunity).toHaveBeenCalledWith(1);
    expect(result).toMatchSnapshot();
  });

  it('renders properly when community not available', () => {
    const renderer = new ShallowRenderer();
    
    useCommunity.mockImplementation(() => null);

    const result = renderer.render(<CommunityDetailsPage />);

    expect(useCommunity).toHaveBeenCalledTimes(1);
    expect(useCommunity).toHaveBeenCalledWith(1);
    expect(result).toMatchSnapshot();
  });
});

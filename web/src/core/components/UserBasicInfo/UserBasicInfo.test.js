import React from 'react';
import renderer from 'react-test-renderer';
import UserBasicInfo from './UserBasicInfo';

describe('UserBasicInfo', () => {
  it('renders properly when user is not provided', () => {
    const component = renderer.create(<UserBasicInfo />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders properly when user is provided', () => {
    const user = {
      name: 'John',
      profileURL: 'test.com',
    };
    const component = renderer.create(<UserBasicInfo user={user} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

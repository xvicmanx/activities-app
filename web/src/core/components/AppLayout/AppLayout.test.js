import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import { faUsers, faHome } from '@fortawesome/free-solid-svg-icons';


import AppLayout from './';

jest.mock('react-redux');
jest.mock('../../../entities/users/redux/UsersActions');
jest.mock('../../helpers');

import { useDispatch } from 'react-redux';
import { logOutUser } from '../../../entities/users/redux/UsersActions';
import { showMobileMenu } from '../../helpers';
 
Enzyme.configure({ adapter: new Adapter() });

describe('AppLayout', () => {
  const navigationLinks = [
    {
      path: '/first-path',
      label: 'First',
      icon: faUsers,
    },
    {
      path: '/second-path',
      label: 'Second',
      icon: faHome,
    },
  ];
  const user = {
    id: 1,
    name: 'John',
  };
  const props = {
    user,
    navigationLinks,
  };

  it('renders properly when showing mobile menu', () => {
    const dispatch = jest.fn();
    showMobileMenu.mockImplementation(() => true);
    useDispatch.mockImplementation(() => dispatch);
    const renderer = new ShallowRenderer();
    const result = renderer.render(<AppLayout {...props}>Test</AppLayout>);
    expect(result).toMatchSnapshot();
  });

  it('renders properly when not showing mobile menu', () => {
    const dispatch = jest.fn();
    showMobileMenu.mockImplementation(() => false);
    useDispatch.mockImplementation(() => dispatch);
    const renderer = new ShallowRenderer();
    const result = renderer.render(<AppLayout {...props}>Test</AppLayout>);
    expect(result).toMatchSnapshot();
  });

  it('logouts user when clicking on nav bar', () => {
    const dispatch = jest.fn();
    showMobileMenu.mockImplementation(() => true);
    useDispatch.mockImplementation(() => dispatch);

    const result = Enzyme.mount(
      <Router>
        <AppLayout {...props}>Test</AppLayout>
      </Router>
    );
    
    result.find('NavBar').at(0).props().onLogoutClick();

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(logOutUser).toHaveBeenCalledTimes(1);
  });
});

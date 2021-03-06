// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer } from 'react-toastify';

import { logOutUser } from '../../../entities/users/redux/UsersActions';
import { showMobileMenu } from '../../helpers';

import { NavBar, UserBasicInfo } from '../';

import './AppLayout.css';

type NavigationLinkOption = {
  path: string,
  icon: any,
  label: string,
};

export type Props = {
  user: Object,
  navigationLinks: Array<NavigationLinkOption>,
  children: any,
};

const AppLayout = ({
  user,
  navigationLinks,
  children,
}: Props): React$Element<'div'> => {
  const dispatch = useDispatch();
  return (
    <div className="LayoutWrapper">
      <div className="Layout">
        <div
          className={`Layout__Left-Navigator ${showMobileMenu() ? 'show' : ''}`}
        >
          <UserBasicInfo user={user} />
          <div className="Options">
            {navigationLinks.map((link) => (
              <NavLink
                exact
                className="Option__Link"
                to={link.path}
                key={link.path}
              >
                <FontAwesomeIcon icon={link.icon} className="Option__Icon" />{' '}
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="Layout__Content">
          <NavBar onLogoutClick={() => dispatch(logOutUser())} />
          <div
            className={`Layout__Scroll-Content-Wrapper ${
              showMobileMenu() ? 'hide' : ''
            }`}
          >
            <div className="Layout__Scroll-Content">{children}</div>
          </div>
          <ToastContainer position="top-center" />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

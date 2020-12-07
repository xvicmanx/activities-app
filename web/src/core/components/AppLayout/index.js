// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavBar, UserBasicInfo } from '../../components';

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
  const showMobileMenu = window.location.pathname.includes('display-menu');
  return (
    <div className="LayoutWrapper">
      <div className="Layout">
        <div
          className={`Layout__Left-Navigator ${showMobileMenu ? 'show' : ''}`}
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
          <NavBar right />
          <div
            className={`Layout__Scroll-Content-Wrapper ${
              showMobileMenu ? 'hide' : ''
            }`}
          >
            <div className="Layout__Scroll-Content">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
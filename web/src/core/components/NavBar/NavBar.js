// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bulma-components';

import menuIcon from '../../../assets/images/menu.svg';

import './NavBar.css';

type Props = {
  onLogoutClick?: Function,
};

const NavBar = ({ onLogoutClick }: Props): React$Element<any> => (
  <div className="NavBar right">
    <Link className="NavBar__link menu" to="/home/display-menu">
      <Image src={menuIcon} alt="menu" />
    </Link>

    <Link onClick={onLogoutClick} className="NavBar__link" to="/">
      Cerrar Sesion
    </Link>
  </div>
);

export default NavBar;

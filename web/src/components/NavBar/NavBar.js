import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'react-bulma-components';

import { logOutUser } from '../../entities/users/redux/UsersActions';

import menuIcon from "../../assets/images/menu.svg";

import './NavBar.css';

const NavBar = ({ inverted, right }) => {
  const { Users } = useSelector(state => state);
  const dispatch = useDispatch();
  const additionalClasses = [];

  if (inverted) {
    additionalClasses.push('inverted');
  }

  if (right) {
    additionalClasses.push('right');
  }

  if (!Users.data) {
    return (
      <div className={`NavBar ${additionalClasses.join(' ')}`}>
        <Switch>
          <Route exact path="/login">
            <Link className="NavBar__link" to="/">
              Atras
            </Link>
          </Route>
        </Switch>
      </div>
    );
  }

  return (
    <div className={`NavBar ${additionalClasses.join(' ')}`}>
      <Link className="NavBar__link menu" to="/home/display-menu">
        <Image
          src={menuIcon}
          alt="menu"
        />
      </Link>

      <Link
        onClick={() => dispatch(logOutUser())}
        className="NavBar__link"
        to="/"
      >
        Cerrar Sesion
      </Link>
    </div>
  );
};

export default NavBar;

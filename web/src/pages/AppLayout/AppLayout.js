import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Image } from 'react-bulma-components';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';

import {
  HomePage
} from '../';
import {
  NavBar,
  UserBasicInfo,
  LoadingIndicator
} from '../../components';
import homeIcon from "../../assets/images/front.svg";

import {
  readTokenFromCookie,
  loadUserFromToken,
} from '../../redux/Users/UsersActions';
import './AppLayout.css';

const AppLayout = () => {
  const { Users } = useSelector(state => state);
  const dispatch = useDispatch();
  const token = readTokenFromCookie();

  const shouldLoadToken = !Users.data && !Users.loading && token;

  useEffect(() => {
    dispatch(loadUserFromToken({
      token,
      shouldLoadToken,
    }));
  }, [dispatch, token, shouldLoadToken]);

  if (!Users.data && !Users.loading && !token) {
    return <Redirect to="/" />;
  }

  if (!Users.data) {
    return (
      <LoadingIndicator />
    );
  }

  const showMobileMenu = window.location.pathname.includes('display-menu');

  return (
    <div className="LayoutWrapper">
      <div className="Layout">
        <div className={`Layout__Left-Navigator ${showMobileMenu ? 'show' : ''}`}>
          <UserBasicInfo
            user={Users.data}
            image={require('../../assets/images/avatar.png')}
          />
          <div className="Options">
            <NavLink exact className="Option__Link" to="/home">
              <Image
                src={homeIcon}
                alt="home"
                className="Option__Icon"
              /> Inicio
            </NavLink>
          </div>
        </div>
        <div className="Layout__Content">
          <NavBar right />
          <div className={`Layout__Scroll-Content-Wrapper ${showMobileMenu ? 'hide' : ''}`}>
            <div className="Layout__Scroll-Content">
              <Switch>
                <Route path="/home" component={HomePage} />
              </Switch>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

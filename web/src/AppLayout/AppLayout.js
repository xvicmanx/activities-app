import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faHome, faBuilding } from '@fortawesome/free-solid-svg-icons'

import {
  NavBar,
  UserBasicInfo,
  LoadingIndicator
} from '../components';
import homeIcon from "../assets/images/front.svg";

import {
  readTokenFromCookie,
  loadUserFromToken,
} from '../entities/users/redux/UsersActions';
import './AppLayout.css';

import HomePage from '../core/pages/HomePage/HomePage';
import ActivitiesPage from '../entities/activities/pages/ActivitiesPage';
import CommunitiesPage from '../entities/communities/pages/CommunitiesPage';
import CommunityDetailsPage from '../entities/communities/pages/CommunityDetailsPage';
import UsersPage from '../entities/users/pages/UsersPage';


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
            image={Users.data.profileURL}
          />
          <div className="Options">
            <NavLink exact className="Option__Link" to="/home">
              <FontAwesomeIcon icon={faHome} className="Option__Icon" /> Inicio
            </NavLink>
            <NavLink exact className="Option__Link" to="/activities">
              <FontAwesomeIcon icon={faUsers} className="Option__Icon" /> Actividades
            </NavLink>
            <NavLink exact className="Option__Link" to="/communities">
              <FontAwesomeIcon icon={faBuilding} className="Option__Icon" /> Comunidades
            </NavLink>
            <NavLink exact className="Option__Link" to="/users">
              <FontAwesomeIcon icon={faUsers} className="Option__Icon" /> Usuarios
            </NavLink>
          </div>
        </div>
        <div className="Layout__Content">
          <NavBar right />
          <div className={`Layout__Scroll-Content-Wrapper ${showMobileMenu ? 'hide' : ''}`}>
            <div className="Layout__Scroll-Content">
              <Switch>
                <Route path="/activities" component={ActivitiesPage} />
                <Route path="/communities" component={CommunitiesPage} exact />
                <Route path="/communities/:id" component={CommunityDetailsPage} />
                <Route path="/users" component={UsersPage} />
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

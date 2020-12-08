// @flow

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { faUsers, faHome, faBuilding } from '@fortawesome/free-solid-svg-icons';

import { AppLayout, LoadingIndicator } from './core/components';

import {
  readToken,
  loadUserFromToken,
} from './entities/users/redux/UsersActions';

import HomePage from './core/pages/HomePage/HomePage';
import ActivitiesPage from './entities/activities/pages/ActivitiesPage';
import CommunitiesPage from './entities/communities/pages/CommunitiesPage';
import CommunityDetailsPage from './entities/communities/pages/CommunityDetailsPage';
import UsersPage from './entities/users/pages/UsersPage';

type Props = {};

const AdminApp = (props: Props): React$Element<any> => {
  const { Users } = useSelector((state) => state);
  const dispatch = useDispatch();
  const token = readToken();

  const shouldLoadToken = !Users.data && !Users.loading && token;

  useEffect(() => {
    dispatch(
      loadUserFromToken({
        token,
        shouldLoadToken,
      })
    );
  }, [dispatch, token, shouldLoadToken]);

  if (!Users.data && !Users.loading && !token) {
    return <Redirect to="/" />;
  }

  if (!Users.data) {
    return <LoadingIndicator />;
  }

  return (
    <AppLayout
      {...props}
      user={Users.data}
      navigationLinks={[
        {
          path: '/home',
          label: 'Inicio',
          icon: faHome,
        },
        {
          path: '/activities',
          label: 'Actividades',
          icon: faUsers,
        },
        {
          path: '/communities',
          label: 'Comunidades',
          icon: faBuilding,
        },
        {
          path: '/users',
          label: 'Usuarios',
          icon: faUsers,
        },
      ]}
    >
      <Switch>
        <Route path="/activities" component={ActivitiesPage} />
        <Route path="/communities" component={CommunitiesPage} exact />
        <Route path="/communities/:id" component={CommunityDetailsPage} />
        <Route path="/users" component={UsersPage} />
        <Route path="/home" component={HomePage} />
      </Switch>
    </AppLayout>
  );
};

export default AdminApp;

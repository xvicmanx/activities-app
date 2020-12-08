// @flow

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { faUsers, faHome, faBuilding } from '@fortawesome/free-solid-svg-icons';

import { AppLayout, LoadingIndicator } from './core/components';

import HomePage from './core/pages/HomePage/HomePage';
import ActivitiesPage from './entities/activities/pages/ActivitiesPage';
import CommunitiesPage from './entities/communities/pages/CommunitiesPage';
import CommunityDetailsPage from './entities/communities/pages/CommunityDetailsPage';
import UsersPage from './entities/users/pages/UsersPage';
import useUserFromToken from './useUserFromToken';

type Props = {};

const navigationLinks = [
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
];

const AdminApp = (props: Props): React$Element<any> => {
  const { user, loading, token } = useUserFromToken();

  if (!user && !loading && !token) {
    return <Redirect to="/" />;
  }

  if (!user) {
    return <LoadingIndicator />;
  }

  return (
    <AppLayout {...props} user={user} navigationLinks={navigationLinks}>
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

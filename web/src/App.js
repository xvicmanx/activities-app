import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './core/pages/LoginPage/LoginPage';
import AppLayout from './AppLayout/AppLayout';

import './App.css';

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/" component={LoginPage} exact />
      <Route path="/" component={AppLayout} />
    </Switch>
  </div>
);

export default App;

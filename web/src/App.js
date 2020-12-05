import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { 
  LoginPage,
  AppLayout
} from './pages';

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

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import LoginPage from './core/pages/LoginPage/LoginPage';
import AdminApp from './AdminApp';
import store from './store';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <div className="App">
        <Switch>
          <Route path="/" component={LoginPage} exact />
          <Route path="/" component={AdminApp} />
        </Switch>
      </div>
    </Provider>
  </Router>,
  document.getElementById('root')
);

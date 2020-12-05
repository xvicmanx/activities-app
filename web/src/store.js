import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import LoginFormReducer from './core/redux/LoginForm/LoginFormReducer';
import CommunitiesReducer from './entities/communities/redux/CommunitiesReducer';
import UsersReducer from './entities/users/redux/UsersReducer';

const rootReducer = combineReducers({
  Users: UsersReducer,
  LoginForm: LoginFormReducer,
  Communities: CommunitiesReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));

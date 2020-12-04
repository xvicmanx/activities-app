import { combineReducers } from 'redux';

import UsersReducer from './Users/UsersReducer';
import LoginFormReducer from './LoginForm/LoginFormReducer';
import CommunitiesReducer from './Communities/CommunitiesReducer';


export default combineReducers({
  Users: UsersReducer,
  LoginForm: LoginFormReducer,
  Communities: CommunitiesReducer,
});

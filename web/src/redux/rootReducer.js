import { combineReducers } from 'redux';

import UsersReducer from './Users/UsersReducer';
import LoginFormReducer from './LoginForm/LoginFormReducer';


export default combineReducers({
  Users: UsersReducer,
  LoginForm: LoginFormReducer,
});

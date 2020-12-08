// @flow

import { useDispatch, useSelector } from 'react-redux';
import { handleChange } from '../../redux/LoginForm/LoginFormActions';
import { loginUser } from '../../../entities/users/redux/UsersActions';

type Result = {
  loading?: boolean,
  email?: string,
  password?: string,
  onChange: Function,
  onSubmit: Function,
  error?: string,
};

const useLogin = (): Result => {
  const { Users } = useSelector((state) => state);
  const { email, password } = useSelector((state) => state.LoginForm);
  const dispatch = useDispatch();

  const onChange = (e) => {
    dispatch(handleChange(e));
  };
 
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

 return {
    error: Users.error,
    loading: Users.loading,
    email,
    password,
    onChange,
    onSubmit,
  };
};

export default useLogin;

import React from 'react';
import { Heading } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';

import { handleChange } from '../../redux/LoginForm/LoginFormActions';
import { loginUser } from '../../../entities/users/redux/UsersActions';
import {
  Form,
  FormField,
  Button,
  Input,
  LoadingIndicator,
  ErrorMessage,
} from '../../../components';

import './LoginForm.css'; 


const LoginForm = () => {
  const { Users } = useSelector(state => state);
  const { email, password } = useSelector((state) => state.LoginForm);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    dispatch(handleChange(e));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <div className="LoginForm">
      <Heading className="LoginForm__Title">
        Iniciar sesion
      </Heading>

      {Users.error && <ErrorMessage text={Users.error} />}

      <Form onSubmit={handleOnSubmit}>
        <FormField>
          <Input
            fullwidth="true"
            placeholder="Correo..."
            name="email"
            value={email}
            onChange={handleOnChange}
            autoComplete="off"
            type="email"
          />
        </FormField>

        <FormField>
          <Input
            fullwidth="true"
            placeholder="Contraseña..."
            name="password"
            value={password}
            onChange={handleOnChange}
            autoComplete="off"
            type="password"
          />
        </FormField>

        {Users.loading && <LoadingIndicator />}
        {!Users.loading && (
          <Button
            disabled={!password || !email}
            fullwidth
            type="submit"
            color="info"
          >
            Entrar
          </Button>
        )}
      </Form>
    </div>
  );
};

export default LoginForm;

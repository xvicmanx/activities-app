import React from 'react';
import { Heading } from 'react-bulma-components';
import {
  Form,
  FormField,
  Button,
  Input,
  LoadingIndicator,
  ErrorMessage,
} from '../../components';
import useLogin from './useLogin';
import './LoginForm.css';

const LoginForm = () => {
  const { email, password, onChange, onSubmit, loading, error } = useLogin();

  return (
    <div className="LoginForm">
      <Heading className="LoginForm__Title">Iniciar sesion</Heading>

      {error && <ErrorMessage text={error} />}

      <Form onSubmit={onSubmit}>
        <FormField>
          <Input
            fullwidth="true"
            placeholder="Correo..."
            name="email"
            value={email}
            onChange={onChange}
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
            onChange={onChange}
            autoComplete="off"
            type="password"
          />
        </FormField>

        {loading && <LoadingIndicator />}
        {!loading && (
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

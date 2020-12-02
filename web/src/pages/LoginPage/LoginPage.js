import React from 'react';
import { Heading, Image } from 'react-bulma-components';

import './LoginPage.css';

import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { LoginForm } from '../../forms';
import { NavBar } from '../../components';
import logo from "../../assets/images/logo.png";

const LoginPage = () => {
  const { Users } = useSelector(state => state);

  if (Users.data) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="LoginPage">
      <div className="LoginPage__Container">
        <div className="LoginPage__App-Info">
          <div className="LoginPage__LogoContainer top">
            <Image
              src={logo}
              alt="Pic"
              className="LoginPage__Logo top"
            />
          </div>
          <Heading subtitle className="LoginPage__Subtitle">
            Insiemi
          </Heading>
        </div>
        
        <div className="LoginPage__Content">
          <NavBar right />
          <div className="LoginPage__Form">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

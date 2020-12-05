import React from 'react';
import { Heading, Image, Message } from 'react-bulma-components';

import homeIcon from "../../../assets/images/front.svg";

import './HomePage.css';

const HomePage = () => (
  <div className="HomePage">
    <Heading className="HomePage__Title">
      <Image
        src={homeIcon}
        alt="home"
        className="Title-Icon"
      /> Inicio
    </Heading>
    <div className="HomePage__Content">
      <div>
        <Message color="info">
          <Message.Body>
            Bienvenido!
          </Message.Body>
        </Message>
      </div>
    </div>
  </div>
);

export default HomePage;

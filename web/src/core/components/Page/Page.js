import React from 'react';
import { Heading } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Page.css';


const Page = ({ title, icon, children }) => (
  <div className="Page">
    <Heading className="Page__Title">
      <FontAwesomeIcon
        icon={icon}
        className="Title-Icon"
      /> {title}
    </Heading>
    <div className="Page__Content">
      {children}
    </div>
  </div>
);

export default Page;

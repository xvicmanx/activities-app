// @flow

import React from 'react';
import { Heading, Image } from 'react-bulma-components';

import './UserBasicInfo.css';

type User = {
  profileURL: string,
  name: string,
};
type Props = {
  user?: User,
};

const UserBasicInfo = ({ user }: Props): null | React$Element<'div'> => {
  if (!user) return null;
  return (
    <div className="UserBasicInfo">
      <Image
        src={user.profileURL}
        alt="Pic"
        className="UserBasicInfo__Picture"
      />
      <div>
        <Heading size={4} className="inverted">
          {user.name}
        </Heading>
      </div>
    </div>
  );
};

export default UserBasicInfo;

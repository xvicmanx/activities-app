import React from 'react';
import { Image } from 'react-native';
import { Avatar as AvatarRNE } from 'react-native-elements';

const Avatar = ({ img }) => {
  return <AvatarRNE rounded source={{ uri: img }} size="large"></AvatarRNE>;
};

export default Avatar;

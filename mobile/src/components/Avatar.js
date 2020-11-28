import React from 'react';
import { Image } from 'react-native';

const Avatar = ({ style, size, img }) => {
  return (
    <Image
      style={[
        { width: size, height: size, borderRadius: size / 2 },
        { ...style },
      ]}
      source={{ uri: img } || require('../assets/images/avatar.png')}
    />
  );
};

export default Avatar;

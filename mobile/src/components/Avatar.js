import React from 'react';
import { View } from 'react-native';
import { Avatar as AvatarRNE, Text } from 'react-native-elements';
import { COLORS } from '../constants';

const Avatar = ({ size, img, name }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <AvatarRNE rounded source={{ uri: img }} size={size}></AvatarRNE>
      {name && (
        <Text style={{ marginLeft: 10, fontSize: 16, color: COLORS.dark }}>
          {name}
        </Text>
      )}
    </View>
  );
};

export default Avatar;

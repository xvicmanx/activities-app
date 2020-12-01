import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar as AvatarRNE, Text } from 'react-native-elements';
import { COLORS } from '../../constants';

const Avatar = ({ size, img, name }) => {
  return (
    <View style={styles.container}>
      <AvatarRNE rounded source={{ uri: img }} size={size}></AvatarRNE>
      {name && <Text style={styles.text}>{name}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.dark,
  },
});

export default Avatar;

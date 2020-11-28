import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Avatar from './Avatar';

const AvatarItem = ({ name, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.content}>
          <Avatar style={{ marginRight: 5 }} size={45} />
          <Text>{name}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
});

export default AvatarItem;

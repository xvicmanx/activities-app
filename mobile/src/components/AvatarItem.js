import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Avatar from './Avatar';

const AvatarItem = ({ name }) => {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={() => console.warn('OK')}>
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
    marginBottom: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
});

export default AvatarItem;

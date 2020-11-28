import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';

const Button = ({ danger, small, onPress, loading, children }) => {
  const containerStyles = [
    styles.touchable,
    small && styles.small,
    danger && styles.danger,
  ];

  const textStyles = [
    styles.text,
    danger && styles.textDanger,
    small && styles.smallText,
  ];

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={containerStyles}>
        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Text style={textStyles}>{children}</Text>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: '#ccc',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  smallText: {
    fontSize: 14,
  },
  textDanger: {
    color: '#fff',
  },
  small: {
    alignSelf: 'flex-start',
    height: 35,
    paddingHorizontal: 15,
  },
  danger: {
    backgroundColor: '#c0392b',
  },
});

export default Button;

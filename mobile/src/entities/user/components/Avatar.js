import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Avatar from '../../../common/components/Avatar';
import COLORS from '../../../constants/colors';

export default ({ name }) => {
  const isLoading = useSelector(({ image }) => image.isLoading);
  const url = useSelector(({ image }) => image.url);

  return (
    <View style={styles.avatarContainer}>
      <Avatar loading={isLoading} edit size={75} img={url} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
});

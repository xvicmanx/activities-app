import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import AvatarCommon from '../../../common/components/Avatar';
import COLORS from '../../../constants/colors';

const Avatar = ({ name }) => {
  const profileURL = useSelector(({ auth }) => auth.currentUser.profileURL);

  return (
    <View style={styles.avatarContainer}>
      <AvatarCommon edit size={190} uri={profileURL} />
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

export default Avatar;

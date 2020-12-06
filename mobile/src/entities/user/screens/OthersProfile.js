import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../common/components/Loader';
import Avatar from '../../../common/components/Avatar';
import { fetUserById } from '../actions';
import COLORS from '../../../constants/colors';

export default ({ route, navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(({ othersProfile }) => othersProfile.isLoading);
  const user = useSelector(({ othersProfile }) => othersProfile.entity);
  const { userId, name } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  });

  useEffect(() => {
    dispatch(fetUserById(userId));
  }, [userId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar uri={user.profileURL} size={190} />
      </View>
      <Text style={styles.description}>{user.description}</Text>
      <View style={styles.scrollBottomHeight} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    marginTop: 5,
  },
  description: {
    fontSize: 20,
    marginBottom: 20,
    color: COLORS.text,
  },
  scrollBottomHeight: {
    height: 100,
  },
});

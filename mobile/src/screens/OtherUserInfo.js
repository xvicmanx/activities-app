import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Loader } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOtherUserInfo } from '../redux/otherUserSlice';
import { COLORS } from '../constants';

const OtherUserInfo = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state) => state.otherUser);
  const user = useSelector((state) => state.auth.user);
  const { name, id } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  });

  useEffect(() => {
    dispatch(fetchOtherUserInfo(id, user.token));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar img={data.profileURL} size="large" />
      </View>

      <Text style={styles.description}>{data.description}</Text>

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

export default OtherUserInfo;

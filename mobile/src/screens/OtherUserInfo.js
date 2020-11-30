import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Loader } from '../components';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOtherUserInfo } from '../redux/otherUserSlice';
import { COLORS } from '../constants';

const OtherUserInfo = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state) => state.otherUser);
  const user = useSelector((state) => state.auth.user);
  const { params } = useRoute();
  const { setOptions } = useNavigation();

  useEffect(() => {
    setOptions({ title: params.name });
  });

  useEffect(() => {
    dispatch(fetchOtherUserInfo(params.id, user.token));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Avatar img={data.profileURL} size="large" />
      </View>

      <Text style={styles.description}>{data.description}</Text>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
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
});

export default OtherUserInfo;

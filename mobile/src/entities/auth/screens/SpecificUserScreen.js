import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Loader } from '../../../common/components';
import { fetUserById } from '../actions';
import { COLORS } from '../../../constants';

const SpecificUserScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.specificUser);
  const currentUser = useSelector((s) => s.auth.currentUser);
  const { name, id } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  });

  useEffect(() => {
    dispatch(fetUserById(id, currentUser.data.token));
  }, []);

  if (user.isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar img={user.data.profileURL} size="large" />
      </View>
      <Text style={styles.description}>{user.data.description}</Text>
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

export default SpecificUserScreen;

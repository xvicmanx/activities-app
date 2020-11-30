import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Loader, Avatar } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParticipants } from '../redux/activitiesSlice';
import { ListItem } from 'react-native-elements';

const ParticipantesList = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { list, isLoading } = useSelector(
    (state) => state.activities.participants
  );
  const user = useSelector((state) => state.auth.user);
  const { activityId } = route.params;

  useEffect(() => {
    dispatch(fetchParticipants(activityId, user.token));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const keyExtractor = (item) => String(item.id);

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => {
        navigation.navigate('OtherUserInfoScreen', {
          id: item.id,
          name: item.name,
        });
      }}
    >
      <Avatar img={item.profileURL} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <FlatList
      style={styles.flatlist}
      keyExtractor={keyExtractor}
      data={list}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  flatlist: {
    backgroundColor: '#fff',
  },
});

export default ParticipantesList;

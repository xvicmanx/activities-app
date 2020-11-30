import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { Loader } from '../components';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParticipants } from '../redux/activitiesSlice';
import { ListItem, Avatar } from 'react-native-elements';

const ParticipantesList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { list, isLoading } = useSelector(
    (state) => state.activities.participants
  );
  const user = useSelector((state) => state.auth.user);

  const { params } = useRoute();

  useEffect(() => {
    dispatch(fetchParticipants(params.activityId, user.token));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const keyExtractor = (item) => String(item.id);

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() =>
        navigation.navigate('OtherUserInfoScreen', {
          id: item.id,
          name: item.name,
        })
      }
    >
      <Avatar rounded source={{ uri: item.profileURL }} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <FlatList
      style={{ backgroundColor: '#fff' }}
      keyExtractor={keyExtractor}
      data={list}
      renderItem={renderItem}
    />
  );
};

export default ParticipantesList;

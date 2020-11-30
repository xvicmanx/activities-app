import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommunityInfo } from '../redux/communitiesSlice';
import { Loader } from '../components';
import { ListItem } from 'react-native-elements';

const CommunitiesList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading, list } = useSelector((state) => state.communities);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchCommunityInfo(currentUser.token));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => {
        navigation.navigate('CommunityScreen', {
          id: item.id,
          name: item.name,
        });
      }}
    >
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.slogan}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <FlatList
      data={list}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
      ListFooterComponent={<View style={styles.ListFooterComponent} />}
      style={{ backgroundColor: '#fff' }}
    />
  );
};

const styles = StyleSheet.create({
  ListFooterComponent: {
    height: 100,
  },
});

export default CommunitiesList;

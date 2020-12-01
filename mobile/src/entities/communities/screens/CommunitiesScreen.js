import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommunities } from '../actions';
import { Loader, ListItem } from '../../../common/components';

const CommunitiesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const communities = useSelector((s) => s.communities.communities);
  const currentUser = useSelector((s) => s.auth.currentUser);

  useEffect(() => {
    dispatch(fetchCommunities(currentUser.data.token));
  }, []);

  if (communities.isLoading) {
    return <Loader />;
  }

  const renderItem = ({ item }) => {
    return (
      <ListItem
        item={item}
        onPress={() => {
          navigation.navigate('CommunityScreen', {
            id: item.id,
            name: item.name,
          });
        }}
      />
    );
  };

  return (
    <FlatList
      data={communities.list}
      renderItem={renderItem}
      keyExtractor={({ id }) => String(id)}
      ListFooterComponent={<View style={styles.ListFooterComponent} />}
      style={styles.flatlist}
    />
  );
};

const styles = StyleSheet.create({
  ListFooterComponent: {
    height: 100,
  },
  flatlist: {
    backgroundColor: '#fff',
  },
});

export default CommunitiesScreen;

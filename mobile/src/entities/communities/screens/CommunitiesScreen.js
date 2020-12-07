import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../common/components/Loader';
import Comunity from '../components/Comunity';
import { fetchCommunities } from '../actions';

const CommunitiesScreen = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(({ communities }) => communities.isLoading);
  const list = useSelector(({ communities }) => communities.communities.ids);

  useEffect(() => {
    dispatch(fetchCommunities());
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const renderItem = ({ item }) => {
    return <Comunity id={item} />;
  };

  const footer = () => {
    return <View style={styles.ListFooterComponent} />;
  };

  return (
    <FlatList
      data={list}
      renderItem={renderItem}
      keyExtractor={(id) => String(id)}
      ListFooterComponent={footer()}
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

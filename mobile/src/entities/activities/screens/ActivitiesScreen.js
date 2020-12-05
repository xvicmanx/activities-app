import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NoActivity from '../components/NoActivity';
import Activity from '../components/Activity';
import Loader from '../../../common/components/Loader';
import { fetchActivities } from '../actions';

export default ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(({ activities }) => activities.isLoading);
  const list = useSelector(({ activities }) => activities.ids);

  useEffect(() => {
    navigation.setOptions({ title: `Actividades (${list.length})` });
  }, [list]);

  useEffect(() => {
    dispatch(fetchActivities());
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const renderItem = ({ item }) => {
    return <Activity activityId={item} />;
  };

  return (
    <View style={styles.container}>
      {list.length === 0 ? (
        <NoActivity />
      ) : (
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item) => String(item)}
          ListFooterComponent={<View style={styles.ListFooterComponent} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ListFooterComponent: {
    height: 100,
  },
});

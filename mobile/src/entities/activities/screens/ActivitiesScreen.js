import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { NoActivity, ActivityCard } from '../components';
import { Loader } from '../../../common/components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivities } from '../actions';

const ActivitiesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const activities = useSelector((s) => s.activities);
  const currentUser = useSelector((s) => s.auth.currentUser);

  useEffect(() => {
    navigation.setOptions({ title: `Actividades (${activities.list.length})` });
  }, [activities]);

  useEffect(() => {
    dispatch(fetchActivities(currentUser.data.token));
  }, []);

  if (activities.isLoading) {
    return <Loader />;
  }

  const renderItem = ({ item }) => {
    return <ActivityCard activity={item} />;
  };

  return (
    <View style={styles.container}>
      {activities.list.length === 0 ? (
        <View style={styles.center}>
          <NoActivity />
        </View>
      ) : (
        <FlatList
          data={activities.list}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ListFooterComponent: {
    height: 100,
  },
});

export default ActivitiesScreen;

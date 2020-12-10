import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import NoActivity from '../components/NoActivity';
import Activity from '../components/Activity';
import Loader from '../../../common/components/Loader';
import { fetchActivities } from '../actions';

const ActivitiesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(({ activities }) => activities.isLoading);
  const list = useSelector(({ activities }) => activities.ids);
  const refreshing = useSelector(({ activities }) => activities.refreshing);

  useEffect(() => {
    const onNotificationOpenedAppListener = messaging().onNotificationOpenedApp((data) => {
      dispatch(fetchActivities());
      navigation.navigate('ActivitiesScreen');
    });

    const onMessageListener = messaging().onMessage(() => {
      dispatch(fetchActivities());
    });

    return () => {
      onNotificationOpenedAppListener();
      onMessageListener();
    };
  }, []);

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

  const renderFooter = () => {
    return <View style={styles.ListFooterComponent} />;
  };

  const onRefresh = () => {
    dispatch(fetchActivities());
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
          ListFooterComponent={renderFooter()}
          onRefresh={onRefresh}
          refreshing={refreshing}
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

export default ActivitiesScreen;

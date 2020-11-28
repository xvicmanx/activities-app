import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import { NoActivity, ActivityCard, Loader } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivities } from '../redux/activitiesSlice';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading, activities } = useSelector((state) => state.activities);
  const user = useSelector((state) => state.auth.user);

  const renderItem = ({ item }) => {
    return <ActivityCard item={item} />;
  };

  const ItemSeparatorComponent = () => {
    return <View style={{ height: 1 }} />;
  };

  useEffect(() => {
    navigation.setOptions({ title: `Actividades (${activities.length})` });
  }, []);

  useEffect(() => {
    dispatch(fetchActivities(user.token));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      {activities.length === 0 ? (
        <View style={styles.center}>
          <NoActivity />
        </View>
      ) : (
        <FlatList
          data={activities}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          ItemSeparatorComponent={ItemSeparatorComponent}
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
});

export default Home;

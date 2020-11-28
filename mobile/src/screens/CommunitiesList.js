import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommunityInfo } from '../redux/communitiesSlice';
import { useNavigation } from '@react-navigation/native';

const CommunitiesList = () => {
  const dispatch = useDispatch();
  const { isLoading, list } = useSelector((state) => state.communities);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchCommunityInfo(currentUser.token));
  }, []);

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {list.map((comunity) => {
        return <Item key={comunity.id} item={comunity} />;
      })}
    </ScrollView>
  );
};

const Item = ({ item }) => {
  const { navigate } = useNavigation();

  return (
    <TouchableNativeFeedback
      onPress={() =>
        navigate('CommunityScreen', { id: item.id, name: item.name })
      }
    >
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.sloganText}>{item.slogan}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  item: {
    alignSelf: 'flex-start',
    marginBottom: 15,
    paddingRight: 15,
  },
  itemText: {
    fontSize: 20,
  },
  sloganText: {
    fontSize: 14,
  },
});

export default CommunitiesList;

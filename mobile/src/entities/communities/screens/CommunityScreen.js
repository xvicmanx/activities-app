import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../common/components/Loader';
import Member from '../components/Member';
import COLORS from '../../../constants/colors';
import { fetchCommunityById } from '../actions';

const CommunityScreen = ({ route, navigation }) => {
  const { id, name } = route.params;
  const dispatch = useDispatch();
  const community = useSelector(({ communities }) => communities.communities.entities[id]);
  const membersList = useSelector(({ communities }) => communities.members.ids);
  const coordinatorsList = useSelector(({ communities }) => communities.coordinators.ids);
  const isLoading = useSelector(({ communities }) => communities.isLoading);

  useEffect(() => {
    dispatch(fetchCommunityById(id));
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: name });
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.communitySlogan}>{community.slogan}</Text>

      {coordinatorsList.length > 0 && <Text style={styles.label}>Miembros:</Text>}
      {coordinatorsList.length > 0 && coordinatorsList.map((id) => <Member key={id} id={id} />)}

      {membersList.length > 0 && <Text style={styles.label}>Miembros:</Text>}
      {membersList.length > 0 && membersList.map((id) => <Member key={id} id={id} />)}

      <View style={styles.scrollBottomHeight} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  communitySlogan: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.text,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 16,
    color: COLORS.dark,
  },
  scrollBottomHeight: {
    height: 100,
  },
});

export default CommunityScreen;

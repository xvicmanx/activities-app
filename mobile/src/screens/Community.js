import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AvatarItem } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommunityInfoById } from '../redux/communitiesSlice';
import { useNavigation, useRoute } from '@react-navigation/native';

const Community = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.communities.communityLoader);
  const community = useSelector((state) => state.communities.communityDetails);
  const currentUser = useSelector((state) => state.auth.user);
  const { setOptions, navigate } = useNavigation();
  const { params } = useRoute();

  useEffect(() => {
    dispatch(fetchCommunityInfoById(params.id, currentUser.token));
  }, []);

  useEffect(() => {
    setOptions({ title: params.name });
  });

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.communitySlogan}>{community.slogan}</Text>

      {community.members.map((member) => {
        if (member.coordinates) {
          return (
            <View>
              <Text style={styles.label}>Coordinadores:</Text>
              <AvatarItem
                img={member.profileURL}
                key={member.id}
                name={member.name}
                onPress={() =>
                  navigate('OtherUserInfoScreen', {
                    id: member.id,
                    name: member.name,
                  })
                }
              />
            </View>
          );
        }
      })}

      <Text style={styles.label}>Miembros:</Text>

      {community.members.map((member) => {
        if (!member.coordinates) {
          return (
            <AvatarItem
              img={member.profileURL}
              key={member.id}
              name={member.name}
              onPress={() =>
                navigate('OtherUserInfoScreen', {
                  id: member.id,
                  name: member.name,
                })
              }
            />
          );
        }
      })}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  communityName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  communitySlogan: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 16,
  },
});

export default Community;

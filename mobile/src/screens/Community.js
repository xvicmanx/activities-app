import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Loader } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommunityInfoById } from '../redux/communitiesSlice';
import { COLORS } from '../constants';
import { ListItem } from 'react-native-elements';

const Community = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.communities.communityLoader);
  const community = useSelector((state) => state.communities.communityDetails);
  const currentUser = useSelector((state) => state.auth.user);
  const { id, name } = route.params;

  useEffect(() => {
    dispatch(fetchCommunityInfoById(id, currentUser.token));
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: name });
  });

  if (isLoading) {
    return <Loader />;
  }

  const coordinates = community.members?.filter((member) => {
    return member.coordinates;
  });

  const members = community.members?.filter((member) => {
    return !member.coordinates;
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.communitySlogan}>{community.slogan}</Text>

      {coordinates.length > 0 && (
        <>
          <Text style={styles.label}>Coordinadores:</Text>

          {coordinates.map((member) => {
            if (member.coordinates) {
              return (
                <ListItem
                  key={member.id}
                  bottomDivider
                  onPress={() =>
                    navigation.navigate('OtherUserInfoScreen', {
                      id: member.id,
                      name: member.name,
                    })
                  }
                >
                  <Avatar img={member.profileURL} />
                  <ListItem.Content>
                    <ListItem.Title>{member.name}</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              );
            }
          })}
        </>
      )}

      {members.length > 0 && (
        <>
          <Text style={styles.label}>Miembros:</Text>

          {members.map((member) => {
            if (!member.coordinates) {
              return (
                <ListItem
                  key={member.id}
                  bottomDivider
                  onPress={() =>
                    navigation.navigate('OtherUserInfoScreen', {
                      id: member.id,
                      name: member.name,
                    })
                  }
                >
                  <Avatar img={member.profileURL} />
                  <ListItem.Content>
                    <ListItem.Title>{member.name}</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              );
            }
          })}
        </>
      )}

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
    color: COLORS.text,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 16,
    color: COLORS.dark,
  },
});

export default Community;

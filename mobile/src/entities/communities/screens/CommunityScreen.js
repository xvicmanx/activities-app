import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, ListItem } from '../../../common/components';
import { COLORS } from '../../../constants';
import { fetchCommunityById } from '../actions';

const CommunityScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const community = useSelector((s) => s.communities.community);
  const currentUser = useSelector((s) => s.auth.currentUser);
  const { id, name } = route.params;

  useEffect(() => {
    dispatch(fetchCommunityById(id, currentUser.data.token));
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: name });
  });

  if (community.isLoading) {
    return <Loader />;
  }

  const coordinates = community.data.members?.filter((member) => {
    return member.coordinates;
  });

  const members = community.data.members?.filter((member) => {
    return !member.coordinates;
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.communitySlogan}>{community.data.slogan}</Text>

      {coordinates.length > 0 && (
        <>
          <Text style={styles.label}>Coordinadores:</Text>

          {coordinates.map((member) => {
            if (member.coordinates) {
              return (
                <ListItem
                  bottomDivider
                  key={member.id}
                  item={member}
                  onPress={() => {
                    navigation.navigate('SpecificUserScreen', {
                      id: member.id,
                      name: member.name,
                    });
                  }}
                />
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
                  bottomDivider
                  key={member.id}
                  item={member}
                  onPress={() => {
                    navigation.navigate('SpecificUserScreen', {
                      id: member.id,
                      name: member.name,
                    });
                  }}
                />
              );
            }
          })}
        </>
      )}

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

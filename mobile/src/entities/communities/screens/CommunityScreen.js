import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../common/components/Loader';
import ListItem from '../../../common/components/ListItem';
import COLORS from '../../../constants/colors';
import { fetchCommunityById } from '../actions';

const CommunityScreen = ({ route, navigation }) => {
  const { id, name } = route.params;
  const dispatch = useDispatch();
  const community = useSelector(({ communities }) => communities.communities.entities[id]);
  const members = useSelector(({ communities }) => communities.members);
  const coordinators = useSelector(({ communities }) => communities.coordinators);
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

  //TODO: seguir aqui
  console.log({ community, members, coordinators });

  // const coordinates = community.data.members?.filter((member) => {
  //   return member.coordinates;
  // });

  return <Text>klk</Text>;

  // return (
  //   <ScrollView style={styles.container}>
  //     <Text style={styles.communitySlogan}>{community.data.slogan}</Text>

  //     {coordinates.length > 0 && (
  //       <>
  //         <Text style={styles.label}>Coordinadores:</Text>

  //         {coordinates.map((member) => {
  //           if (member.coordinates) {
  //             return (
  //               <ListItem
  //                 bottomDivider
  //                 key={member.id}
  //                 item={member}
  //                 onPress={() => {
  //                   navigation.navigate('SpecificUserScreen', {
  //                     id: member.id,
  //                     name: member.name,
  //                   });
  //                 }}
  //               />
  //             );
  //           }
  //         })}
  //       </>
  //     )}

  //     {members.length > 0 && (
  //       <>
  //         <Text style={styles.label}>Miembros:</Text>

  //         {members.map((member) => {
  //           if (!member.coordinates) {
  //             return (
  //               <ListItem
  //                 bottomDivider
  //                 key={member.id}
  //                 item={member}
  //                 onPress={() => {
  //                   navigation.navigate('SpecificUserScreen', {
  //                     id: member.id,
  //                     name: member.name,
  //                   });
  //                 }}
  //               />
  //             );
  //           }
  //         })}
  //       </>
  //     )}

  //     <View style={styles.scrollBottomHeight} />
  //   </ScrollView>
  // );
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

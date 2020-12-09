import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ListItem from '../../../common/components/ListItem';

const Comunity = ({ id }) => {
  const comunity = useSelector(({ communities }) => communities.communities.entities[id]);
  const { navigate } = useNavigation();

  const onPress = () => {
    navigate('CommunityScreen', { id: comunity.id, name: comunity.name });
  };

  return <ListItem community item={comunity} onPress={onPress} />;
};

export default Comunity;

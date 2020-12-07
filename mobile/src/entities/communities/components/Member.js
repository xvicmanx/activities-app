import React from 'react';
import { useNavigation } from '@react-navigation/native';
import ListItem from '../../../common/components/ListItem';
import { useSelector } from 'react-redux';

const Member = ({ id }) => {
  const { navigate } = useNavigation();
  const member = useSelector(({ communities }) => communities.members.entities[id]);

  const onPress = () => {
    navigate('OthersProfile', {
      userId: id,
      name: member.name,
    });
  };

  return <ListItem bottomDivider item={member} onPress={onPress} />;
};

export default Member;

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ListItem from '../../../common/components/ListItem';

const Participant = ({ participantId }) => {
  const { navigate } = useNavigation();
  const participant = useSelector(({ participants }) => {
    return participants.entities[participantId];
  });

  const handleOnPress = () => {
    navigate('OthersProfile', {
      userId: participantId,
      name: participant.name,
    });
  };

  return <ListItem item={participant} onPress={handleOnPress} />;
};

export default Participant;

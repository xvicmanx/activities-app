import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '../../../common/components/ListItem';

export default ({ participantId }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const participant = useSelector(({ participants }) => {
    return participants.entities[participantId];
  });

  return (
    <ListItem
      item={participant}
      onPress={() => {
        console.warn('OK');
      }}
    />
  );
};

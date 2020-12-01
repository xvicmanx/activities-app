import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';
import { Avatar } from '../../../common/components';

const ParticipantItem = ({ participant }) => {
  const { navigate } = useNavigation();

  return (
    <ListItem
      bottomDivider
      onPress={() => {
        navigate('SpecificUserScreen', {
          id: participant.id,
          name: participant.name,
        });
      }}
    >
      <Avatar img={participant.profileURL} />
      <ListItem.Content>
        <ListItem.Title>{participant.name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

export default ParticipantItem;

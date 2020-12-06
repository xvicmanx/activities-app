import React from 'react';
import { ListItem } from 'react-native-elements';
import Avatar from './Avatar';

export default ({ item, onPress }) => (
  <ListItem bottomDivider onPress={onPress}>
    {item.profileURL && <Avatar uri={item.profileURL} />}
    <ListItem.Content>
      <ListItem.Title>{item.name}</ListItem.Title>
      {item.slogan && <ListItem.Subtitle>{item.slogan}</ListItem.Subtitle>}
    </ListItem.Content>
    <ListItem.Chevron />
  </ListItem>
);

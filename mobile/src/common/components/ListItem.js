import React from 'react';
import { ListItem as ListItemRNE } from 'react-native-elements';
import Avatar from './Avatar';

const ListItem = ({ item, onPress }) => {
  return (
    <ListItemRNE bottomDivider onPress={onPress}>
      {item.profileURL && <Avatar img={item.profileURL} />}
      <ListItemRNE.Content>
        <ListItemRNE.Title>{item.name}</ListItemRNE.Title>
        {item.slogan && (
          <ListItemRNE.Subtitle>{item.slogan}</ListItemRNE.Subtitle>
        )}
      </ListItemRNE.Content>
      <ListItemRNE.Chevron />
    </ListItemRNE>
  );
};

export default ListItem;

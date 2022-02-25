import React from 'react';
import { List, SimpleList } from "@semapps/archipelago-layout";
import PersonIcon from '@material-ui/icons/Person';
import { Avatar } from "@material-ui/core";

const PersonList = props => (
  <List  {...props}>
    <SimpleList
      primaryText={record => record['pair:label']}
      /*secondaryText={record => record['pair:label']}*/
      leftAvatar={record => (
        <Avatar src={record['image']} width="100%">
          <PersonIcon />
        </Avatar>
      )}
      linkType="edit"
    />
  </List>
)

export default PersonList;
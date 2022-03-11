import React from 'react';
import { SimpleList } from "@semapps/archipelago-layout";
import { ListWithPermissions } from '@semapps/auth-provider';
import PersonIcon from '@material-ui/icons/Person';
import { Avatar } from "@material-ui/core";

const PersonList = props => (
  <ListWithPermissions {...props} sort={{ field: 'pair:label', order: 'ASC' }}>
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
  </ListWithPermissions>
)

export default PersonList;
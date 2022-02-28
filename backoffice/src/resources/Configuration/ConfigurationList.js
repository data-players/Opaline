import React from 'react';
import { SimpleList } from "@semapps/archipelago-layout";
import { ListWithPermissions } from '@semapps/auth-provider';
import BuildIcon from '@material-ui/icons/Build';
import { Avatar } from "@material-ui/core";

const ConfigurationList = props => (
  <ListWithPermissions {...props} sort={{ field: 'pair:label', order: 'ASC' }}>
    <SimpleList 
      primaryText={record => record['pair:label']}
      secondaryText={record => record['pair:description']}
      leftAvatar={() => <Avatar width="100%"><BuildIcon /></Avatar>}
      linkType="edit" 
    />
  </ListWithPermissions>
)

export default ConfigurationList;
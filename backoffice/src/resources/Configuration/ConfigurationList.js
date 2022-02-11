import React from 'react';
import { List, SimpleList } from "@semapps/archipelago-layout";
import HelpIcon from '@material-ui/icons/Help';
import { Avatar } from "@material-ui/core";

const ConfigurationList = props => (
  <List  {...props} sort={{ field: 'pair:label', order: 'ASC' }}>
      <SimpleList 
        primaryText={record => record['pair:label']} 
        leftAvatar={() => <Avatar width="100%"><HelpIcon /></Avatar>}
        linkType="edit" 
      />
  </List>
)

export default ConfigurationList;
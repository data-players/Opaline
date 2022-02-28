import React from 'react';
import { SimpleList } from "@semapps/archipelago-layout";
import { ListWithPermissions } from '@semapps/auth-provider';
import HelpIcon from '@material-ui/icons/Help';
import { Avatar } from "@material-ui/core";

const FAQList = props => (
  <ListWithPermissions {...props} sort={{ field: 'pair:label', order: 'ASC' }}>
    <SimpleList 
      primaryText={record => record['pair:label']} 
      leftAvatar={() => <Avatar width="100%"><HelpIcon /></Avatar>}
      linkType="edit" 
    />
  </ListWithPermissions>
)

export default FAQList;
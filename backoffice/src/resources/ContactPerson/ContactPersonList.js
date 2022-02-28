import React from 'react';
import { List, SimpleList } from "@semapps/archipelago-layout";
import ContactPersonIcon from '@material-ui/icons/ContactMail';
import { Avatar } from "@material-ui/core";

const ContactPersonList = props => (
  <List  {...props} sort={{ field: 'pair:label', order: 'ASC' }}>
      <SimpleList 
        primaryText={record => record['pair:label']}
        secondaryText={record => record['pair:description']}
        leftAvatar={() => <Avatar width="100%"><ContactPersonIcon /></Avatar>}
        linkType="edit" 
      />
  </List>
)

export default ContactPersonList;
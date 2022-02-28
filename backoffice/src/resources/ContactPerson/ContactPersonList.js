import React from 'react';
import { SimpleList } from "@semapps/archipelago-layout";
import { ListWithPermissions } from '@semapps/auth-provider';
import ContactPersonIcon from '@material-ui/icons/ContactMail';
import { Avatar } from "@material-ui/core";
import ContactPersonFilterSidebar from './ContactPersonFilterSidebar';

const ContactPersonList = props => (
  <ListWithPermissions aside={<ContactPersonFilterSidebar />} {...props}>
    <SimpleList 
      primaryText={record => record['pair:label']}
      secondaryText={record => record['pair:description']}
      leftAvatar={() => <Avatar width="100%"><ContactPersonIcon /></Avatar>}
      linkType="edit" 
    />
  </ListWithPermissions>
)

export default ContactPersonList;
import React from 'react';
import { SimpleList } from "@semapps/archipelago-layout";
import { ListWithPermissions } from '@semapps/auth-provider';
import ProgramIcon from '@material-ui/icons/AccountTree';
import { Avatar } from "@material-ui/core";
import ProgramFilterSidebar from './ProgramFilterSidebar';

const ProgramList = props => (
  <ListWithPermissions {...props}>
      <SimpleList
        primaryText={record => record['pair:label']}
        leftAvatar={() => <Avatar width="100%"><ProgramIcon /></Avatar>}
        linkType="edit"
      />
  </ListWithPermissions>
)

export default ProgramList;

import React from 'react';
import { SimpleList } from "@semapps/archipelago-layout";
import { ListWithPermissions } from '@semapps/auth-provider';
import HomeIcon from '@material-ui/icons/Build';
import { Avatar } from "@material-ui/core";
import ProgramFilterSidebar from './ProgramFilterSidebar';

const ProgramList = props => (
  <ListWithPermissions aside={<ProgramFilterSidebar />} {...props}>
      <SimpleList 
        primaryText={record => record['pair:label']} 
        leftAvatar={() => <Avatar width="100%"><HomeIcon /></Avatar>}
        linkType="edit" 
      />
  </ListWithPermissions>
)

export default ProgramList;

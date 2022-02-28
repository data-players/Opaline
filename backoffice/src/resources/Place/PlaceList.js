import React from 'react';
import { SimpleList } from "@semapps/archipelago-layout";
import { ListWithPermissions } from '@semapps/auth-provider';
import PlaceIcon from '@material-ui/icons/LocationOn';
import { Avatar } from "@material-ui/core";
import PlaceFilterSidebar from './PlaceFilterSidebar';

const PlaceList = props => (
  <ListWithPermissions aside={<PlaceFilterSidebar />} {...props}>
      <SimpleList 
        primaryText={record => record['pair:label']} 
        leftAvatar={() => <Avatar width="100%"><PlaceIcon /></Avatar>}
        linkType="edit" 
      />
  </ListWithPermissions>
)

export default PlaceList;

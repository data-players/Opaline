import React from 'react';
import { SimpleList } from "@semapps/archipelago-layout";
import { ListWithPermissions } from '@semapps/auth-provider';
import TrainingSiteIcon from '@material-ui/icons/LocationOn';
import { Avatar } from "@material-ui/core";
import TrainingSiteFilterSidebar from './TrainingSiteFilterSidebar';

const TrainingSiteList = props => (
  <ListWithPermissions {...props}>
      <SimpleList
        primaryText={record => record['pair:label']}
        leftAvatar={() => <Avatar width="100%"><TrainingSiteIcon /></Avatar>}
        linkType="edit"
      />
  </ListWithPermissions>
)

export default TrainingSiteList;

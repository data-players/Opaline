import React from 'react';

import { TextField, Typography } from '@material-ui/core';
import { Show } from 'react-admin';

import { ShowActions } from "@semapps/archipelago-layout";

import FullWidthBox from '../../commons/FullWidthBox';
import Title from "../commons/Title";

const OrganizationShow = ({...props}) => (
  <Show actions={<ShowActions hasList={false} />} {...props} >
    <FullWidthBox>
      <Title label={""}/> 
      <Typography component="div">
        <TextField source="pair:description" />
      </Typography>
    </FullWidthBox>
  </Show>
);


export default OrganizationShow;
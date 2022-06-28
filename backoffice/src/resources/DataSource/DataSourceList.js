import React from 'react';
import { ReferenceField } from "@semapps/semantic-data-provider";
import { Avatar } from "@material-ui/core";
import {
  ReferenceInput,
  SelectInput,
  AutocompleteInput,
  TextField,
  Datagrid,
  TextInput,
  List,
  EditButton,
  SimpleList
} from 'react-admin';

const DataSourceList = props => (
  <List  {...props}>
      <SimpleList primaryText={record => record['pair:label']} linkType="show" />
  </List>
)

export default DataSourceList;

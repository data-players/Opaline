import React from 'react';
import { Show, MainList } from "@semapps/archipelago-layout";
import { ReferenceField } from "@semapps/semantic-data-provider";
import DataSourceTitle from "./DataSourceTitle";
import { MarkdownField } from '@semapps/markdown-components';
import {
  TextField,
} from 'react-admin';

const DataSourceShow = props => (
  <Show title={<DataSourceTitle />} {...props}>
      <MainList>
        <TextField source="pair:label"></TextField>
        <MarkdownField source="pair:description" />
      </MainList>
  </Show>
);

export default DataSourceShow;

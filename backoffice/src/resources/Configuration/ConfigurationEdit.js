import React from 'react';
import { SimpleForm, TextInput, required } from 'react-admin';
import { JsonInput } from "react-admin-json-view";
import { EditWithPermissions } from '@semapps/auth-provider';
import { MarkdownInput } from '@semapps/markdown-components'
import Title from "../commons/Title";
import searchConfig from './searchConfig.json';

export const ConfigurationEdit = props => (
  <EditWithPermissions title={<Title />} {...props}>
    <SimpleForm>
      <TextInput source="pair:label" fullWidth validate={[required()]} />
      <MarkdownInput multiline source="pair:description" fullWidth />
      <JsonInput
        source="opal:json"
        label="JSON"
        validate={[required()]}
        jsonString={true} // Set to true if the value is a string, default: false
        reactJsonOptions={{
          // Props passed to react-json-view
          name: null,
          collapsed: true,
          enableClipboard: false,
          displayDataTypes: false,
        }}
        initialValue={JSON.stringify(searchConfig)}
      />
    </SimpleForm>
  </EditWithPermissions>
);

export default ConfigurationEdit;

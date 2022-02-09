import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import { EditWithPermissions } from '@semapps/auth-provider';
import { MarkdownInput } from '@semapps/markdown-components'
import Title from "../commons/Title";

export const FAQEdit = props => (
  <EditWithPermissions title={<Title />} {...props}>
    <SimpleForm>
      <TextInput source="pair:label" fullWidth />
      <MarkdownInput multiline source="pair:description" fullWidth />
    </SimpleForm>
  </EditWithPermissions>
);

export default FAQEdit;

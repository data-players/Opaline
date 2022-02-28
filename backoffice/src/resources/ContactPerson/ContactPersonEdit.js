import React from 'react';
import { ReferenceInput, SelectInput, SimpleForm, TextInput, required } from 'react-admin';
import { EditWithPermissions } from '@semapps/auth-provider';
import { MarkdownInput } from '@semapps/markdown-components'
import Title from "../commons/Title";

export const ContactPersonEdit = props => (
  <EditWithPermissions title={<Title />} {...props}>
    <SimpleForm>
      <ReferenceInput
        source="pair:affiliates"
        reference="Organization"
        validate={[required()]}
        fullWidth
      >
        <SelectInput optionText="pair:label" />
      </ReferenceInput>
      <TextInput source="pair:label" fullWidth validate={[required()]} />
      <MarkdownInput multiline source="pair:description" fullWidth />
      <TextInput source="pair:phone" fullWidth />
      <TextInput source="pair:e-mail" fullWidth />
      <TextInput source="opal:civilityTitle" fullWidth />
    </SimpleForm>
  </EditWithPermissions>
);

export default ContactPersonEdit;

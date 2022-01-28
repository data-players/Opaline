import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import { EditWithPermissions } from '@semapps/auth-provider';
import ConceptTitle from './ConceptTitle';

export const ConceptEdit = props => (
  <EditWithPermissions title={<ConceptTitle />} {...props}>
    <SimpleForm>
      <TextInput source="pair:label" fullWidth />
    </SimpleForm>
  </EditWithPermissions>
);

export default ConceptEdit;

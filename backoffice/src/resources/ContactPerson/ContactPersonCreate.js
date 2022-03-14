import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import { Create } from '@semapps/archipelago-layout';

const ContactPersonCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="pair:firstName" fullWidth />
      <TextInput source="pair:lastName" fullWidth />
    </SimpleForm>
  </Create>
);

export default ContactPersonCreate;
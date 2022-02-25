import { default as React } from 'react';

import { TextInput } from "ra-ui-materialui";
import {
  ArrayInput,
  ImageInput,
  SimpleForm,
  SimpleFormIterator,
  required
} from 'react-admin';

import { MarkdownInput } from '@semapps/markdown-components'
import { ImageField } from '@semapps/semantic-data-provider';

import PairLocationInput from '../../pair/PairLocationInput';
import Title from '../commons/Title';
import { EditWithPermissions } from '@semapps/auth-provider';
 
const validateForm = (values) => {
  const errors = {};
  const emailFilled = values['pair:e-mail']?.length > 0;
  const phoneFilled = values['pair:phone']?.length > 0;
  if (! emailFilled && ! phoneFilled) {
    const message = 'Veuillez saisir au moins un e-mail ou un téléphone';
    errors['pair:e-mail'] = message;
    errors['pair:phone'] = message;
  }
  return errors
};

export const OrganizationEdit = props => (
  <EditWithPermissions title={<Title />} {...props} >
    <SimpleForm validate={validateForm}>
      <TextInput source="pair:label" fullWidth validate={[required()]} />
      <PairLocationInput source="pair:hasLocation" fullWidth validate={[required()]} />
      <MarkdownInput source="pair:description" multiline fullWidth validate={[required()]} />
      <ImageInput source="pair:depictedBy" accept="image/*">
        <ImageField source="src" />
      </ImageInput>
      <TextInput source="pair:phone" fullWidth />
      <TextInput source="pair:e-mail" fullWidth />
      <ArrayInput source="opal:socialNetworks">
        <SimpleFormIterator>
          <TextInput type="url" label="url"/>
        </SimpleFormIterator>
      </ArrayInput>
      <TextInput source="pair:webPage" fullWidth />
    </SimpleForm>
  </EditWithPermissions>
);

export default OrganizationEdit;

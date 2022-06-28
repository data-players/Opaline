import { default as React } from 'react';

import { TextInput } from "ra-ui-materialui";
import {
  ArrayInput,
  ImageInput,
  SimpleForm,
  SimpleFormIterator,
  required,
  SelectInput,
  useEditController
} from 'react-admin';

import { MarkdownInput } from '@semapps/markdown-components'
import { ImageField,ReferenceInput} from '@semapps/semantic-data-provider';

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

export const OrganizationEdit = props => {
  const {
      record, // record fetched via dataProvider.getOne() based on the id from the location
  } = useEditController(props);
  const lock = record?.['aurba:externalSource']!=undefined;
  console.log('lock',lock);
  return (
    <EditWithPermissions title={<Title />} {...props} >
      <SimpleForm validate={validateForm}>
        <TextInput source="pair:label" fullWidth validate={[required()]} />
        <PairLocationInput source="pair:hasLocation" fullWidth validate={[required()]} />
        <TextInput source="pair:hasLocation.pair:hasPostalAddress.pair:addressZipCode" fullWidth disabled={true} />
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
        <ReferenceInput reference="DataSource" fullWidth source="aurba:hasDataSource" allowEmpty>
          <SelectInput optionText="pair:label" disabled={lock}/>
        </ReferenceInput>
      </SimpleForm>
    </EditWithPermissions>
  );
}

export default OrganizationEdit;

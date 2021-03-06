import React from 'react';
import { ReferenceInput, SelectInput, SimpleForm, TextInput, required } from 'react-admin';
import { EditWithPermissions } from '@semapps/auth-provider';
import { MarkdownInput } from '@semapps/markdown-components'
import Title from "../commons/Title";
import PairLocationInput from '../../pair/PairLocationInput';

export const TrainingSiteEdit = props => (
  <EditWithPermissions title={<Title />} {...props} >
    <SimpleForm>
      <TextInput source="pair:label" fullWidth validate={[required()]} />
      <ReferenceInput
        source="pair:offeredBy"
        reference="Organization"
        validate={[required()]}
        fullWidth
      >
        <SelectInput optionText="pair:label" />
      </ReferenceInput>
      <PairLocationInput source="pair:hasLocation" fullWidth validate={[required()]} />
      <TextInput source="pair:hasLocation.pair:hasPostalAddress.pair:addressZipCode" fullWidth disabled={true} />
      <MarkdownInput source="pair:description" multiline fullWidth />
    </SimpleForm>
  </EditWithPermissions>
);

export default TrainingSiteEdit;

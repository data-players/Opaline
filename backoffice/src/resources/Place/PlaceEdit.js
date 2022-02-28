import { default as React } from 'react';

import { TextInput } from "ra-ui-materialui";
import {
  ReferenceInput,
  SelectInput,
  required
} from 'react-admin';

import { MarkdownInput } from '@semapps/markdown-components'
import PairLocationInput from '../../pair/PairLocationInput';
import Title from '../commons/Title';
import { EditWithPermissions } from '@semapps/auth-provider';

export const PlaceEdit = props => (
  <EditWithPermissions title={<Title />} {...props} >
    <TextInput source="pair:label" fullWidth validate={[required()]} />
    {/*
    <ReferenceInput
      source="opal:placeOfferedBy"
      reference="Organization"
      validate={[required()]}
      fullWidth
    >
      <SelectInput optionText="pair:label" />
    </ReferenceInput>
    <PairLocationInput source="pair:hasLocation" fullWidth validate={[required()]} />*/}
    <MarkdownInput source="pair:description" multiline fullWidth />
  </EditWithPermissions>
);

export default PlaceEdit;

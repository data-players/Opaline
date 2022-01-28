import React from 'react';

import { SimpleForm, TextInput } from "ra-ui-materialui";
import { ArrayInput, ImageInput, SelectInput, SimpleFormIterator, required } from 'react-admin';

import { MapField } from '@semapps/geo-components';
import { MarkdownInput } from '@semapps/markdown-components'
import { ImageField, ReferenceInput, ReificationArrayInput } from '@semapps/semantic-data-provider';

import PairLocationInput from '../../pair/PairLocationInput';

export const OrganizationForm = props => (
  <>
    <TextInput source="pair:label" fullWidth validate={[required()]} />
    <ReferenceInput
      source="pair:hasType"
      reference="OrganizationType"
      validate={[required()]}
    >
      <SelectInput optionText="pair:label" />
    </ReferenceInput>
    <MarkdownInput source="pair:description" multiline fullWidth />
    <PairLocationInput source="pair:hasLocation" fullWidth />
    <TextInput source="pair:e-mail" type="email" fullWidth/>
    <TextInput source="pair:phone" fullWidth />
    <TextInput source="pair:webPage" fullWidth />
  </>
)

export default OrganizationForm;

import { default as React } from 'react';

import { TextInput } from "ra-ui-materialui";
import {
  FormTab,
  ImageInput,
  SelectInput,
  TabbedForm,
  required,
  ReferenceInput
} from 'react-admin';

import { MarkdownInput } from '@semapps/markdown-components'
import { ImageField } from '@semapps/semantic-data-provider';

import PairLocationInput from '../../pair/PairLocationInput';
import Title from '../commons/Title';
import { EditWithPermissions } from '@semapps/auth-provider';
    

export const OrganizationEdit = props => (
  <EditWithPermissions title={<Title />} {...props} >
    <TabbedForm>
      <FormTab label="Principal">
        <TextInput source="pair:label" fullWidth validate={[required()]} />
        <ReferenceInput
          source="pair:hasType"
          reference="OrganizationType"
        >
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
        <MarkdownInput source="pair:description" multiline fullWidth />
        <PairLocationInput source="pair:hasLocation" fullWidth />
        <ImageInput source="pair:depictedBy" accept="image/*" multiple>
          <ImageField source="src" />
        </ImageInput>
        <TextInput source="pair:e-mail" type="email" fullWidth/>
        <TextInput source="pair:phone" fullWidth />
        <TextInput source="pair:webPage" fullWidth />
      </FormTab>
    </TabbedForm>
  </EditWithPermissions>
);

export default OrganizationEdit;

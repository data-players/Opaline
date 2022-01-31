import { default as React } from 'react';

import { TextInput } from "ra-ui-materialui";
import {
  FormTab,
  ImageInput,
  TabbedForm,
  required
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
        <PairLocationInput source="pair:hasLocation" fullWidth />
        <MarkdownInput source="pair:description" multiline fullWidth />
        <ImageInput source="pair:depictedBy" accept="image/*">
          <ImageField source="src" />
        </ImageInput>
        <TextInput source="pair:phone" fullWidth />
        <TextInput source="pair:e-mail" type="email" fullWidth/>
        <TextInput source="pair:webPage" fullWidth />
      </FormTab>
    </TabbedForm>
  </EditWithPermissions>
);

export default OrganizationEdit;

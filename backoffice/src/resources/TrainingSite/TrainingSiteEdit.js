import React from 'react';
import { SelectInput, SimpleForm, TextInput,AutocompleteInput, required,useEditController } from 'react-admin';
import { EditWithPermissions } from '@semapps/auth-provider';
import { MarkdownInput } from '@semapps/markdown-components'
import Title from "../commons/Title";
import PairLocationInput from '../../pair/PairLocationInput';
import { ReferenceInput } from '@semapps/semantic-data-provider';

export const TrainingSiteEdit = props => {
  const {
      record, // record fetched via dataProvider.getOne() based on the id from the location
  } = useEditController(props);
  return (
    <EditWithPermissions title={<Title />} {...props} >
      <SimpleForm>
        <TextInput source="pair:label" fullWidth validate={[required()]} />
        <ReferenceInput
          source="pair:offeredBy"
          reference="Organization"
          validate={[required()]}
          fullWidth
        >
          <AutocompleteInput optionText="pair:label" shouldRenderSuggestions={value => {
            return value && value.length > 1
          }}/>
        </ReferenceInput>
        <PairLocationInput source="pair:hasLocation" fullWidth validate={[required()]} />
        {record&&record['pair:hasLocation']&&
            <TextInput source="pair:hasLocation.pair:hasPostalAddress.pair:addressZipCode" fullWidth disabled={true} />
        }
        <MarkdownInput source="pair:description" multiline fullWidth />
      </SimpleForm>
    </EditWithPermissions>
  );
}

export default TrainingSiteEdit;

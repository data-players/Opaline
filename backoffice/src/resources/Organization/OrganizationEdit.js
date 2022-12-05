import { default as React } from 'react';

import { TextInput } from "ra-ui-materialui";
import {
  ArrayInput,
  ImageInput,
  SimpleForm,
  SimpleFormIterator,
  required,
  SelectInput,
  useEditController,
  BooleanInput
} from 'react-admin';

import { MarkdownInput } from '@semapps/markdown-components'
import { ImageField,ReferenceInput} from '@semapps/semantic-data-provider';

import PairLocationInput from '../../pair/PairLocationInput';
import Title from '../commons/Title';
import { EditWithPermissions } from '@semapps/auth-provider';
import ToolBarCustom from '../commons/ToolBarCustom';
import { ChipList } from '@semapps/list-components';

import { QuickAppendReferenceArrayField } from '@semapps/field-components';

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
  console.log('record',record);
  const lock = record?.['aurba:externalSource']!=undefined;
  const deleteable = !lock || record?.['aurba:externalDeleted']!=undefined;
  return (
    <EditWithPermissions title={<Title />} {...props} >
      <SimpleForm toolbar={<ToolBarCustom deleteable={deleteable}/>}>
        <TextInput source="pair:label" fullWidth validate={[required()]} disabled={lock}/>
        <PairLocationInput source="pair:hasLocation" fullWidth validate={[required()]} disabled={lock}/>
        {record&&record['pair:hasLocation']&&
            <TextInput source="pair:hasLocation.pair:hasPostalAddress.pair:addressZipCode" fullWidth disabled={true} />
        }
        <MarkdownInput source="pair:description" multiline fullWidth validate={[required()]} readOnly={lock}/>
        {!lock &&
          <ImageInput source="pair:depictedBy" accept="image/*" disabled={lock}>
            <ImageField source="src" disabled={lock}/>
          </ImageInput>
        }
        {lock &&
          <ImageField source="pair:depictedBy"/>
        }
        <TextInput source="pair:phone" fullWidth disabled={lock}/>
        <TextInput source="pair:e-mail" fullWidth disabled={lock}/>
        <ArrayInput source="opal:socialNetworks" disabled={lock}>
          <SimpleFormIterator>
            <TextInput type="url" label="url"/>
          </SimpleFormIterator>
        </ArrayInput>
        <TextInput source="pair:webPage" fullWidth disabled={lock}/>
        <TextInput source="aurba:siret" fullWidth disabled={lock}/>
        <QuickAppendReferenceArrayField label="programmes" reference="Program" source="pair:offers" filter={{"type":"opal:Program"}}>
          <ChipList primaryText="pair:label" externalLinks />
        </QuickAppendReferenceArrayField>
        <QuickAppendReferenceArrayField label="lieux de fomation" reference="TrainingSite" source="pair:offers" filter={{"type":"opal:TrainingSite"}}>
          <ChipList primaryText="pair:label"  externalLinks />
        </QuickAppendReferenceArrayField>
        <QuickAppendReferenceArrayField label="personnes de contact" reference="ContactPerson" source="pair:affiliatesBy">
          <ChipList primaryText="pair:lastName" externalLinks />
        </QuickAppendReferenceArrayField>

        <ReferenceInput reference="DataSource" fullWidth source="aurba:hasDataSource" allowEmpty disabled={lock}>
          <SelectInput optionText="pair:label" disabled={lock}/>
        </ReferenceInput>
        {lock &&
          <BooleanInput source="aurba:externalDeleted" disabled={true} />
        }
      </SimpleForm>
    </EditWithPermissions>
  );
}

export default OrganizationEdit;

import React, { useState } from 'react';

import { TextInput } from "ra-ui-materialui";
import {
  ArrayInput,
  BooleanInput,
  DateInput,
  FormTab,
  NumberInput,
  SelectArrayInput,
  SelectInput,
  SimpleFormIterator,
  TabbedForm,
  AutocompleteInput,
  required,
  useEditController
} from 'react-admin';

import { MarkdownInput } from '@semapps/markdown-components'
import Title from '../commons/Title';
import { EditWithPermissions } from '@semapps/auth-provider';
import { ReferenceArrayInput,ReferenceInput } from '@semapps/semantic-data-provider';

import { QuickAppendReferenceArrayField } from '@semapps/field-components';

export const ProgramEdit = props => {
  const controllerProps = useEditController(props);
  const [newOrganization, setNewOrganization] = useState();


  const validateMultiple = (value, allValues) => {
    const errors = {};
    // console.log(value, allValues);
    console.log('1',allValues['opal:hasJobSearchGoals']);
    console.log('2',allValues['opal:hasBusinessCreationGoals']);
    console.log('3',allValues['opal:hasTrainingGoals']);
    console.log('4',allValues['opal:hasFindingHelpGoals']);
    const hasJobSearchGoals=allValues['opal:hasJobSearchGoals']==undefined || allValues['opal:hasJobSearchGoals'].length==0;
    const hasBusinessCreationGoals=allValues['opal:hasBusinessCreationGoals']==undefined || allValues['opal:hasBusinessCreationGoals'].length==0;
    const hasTrainingGoals=allValues['opal:hasTrainingGoals']==undefined || allValues['opal:hasTrainingGoals'].length==0;
    const hasFindingHelpGoals=allValues['opal:hasFindingHelpGoals']==undefined || allValues['opal:hasFindingHelpGoals'].length==0;


    if ( hasJobSearchGoals && hasBusinessCreationGoals && hasTrainingGoals && hasFindingHelpGoals){
      console.error('un des 4 champs doit être rempli');
      // errors= {
      //   'opal:hasJobSearchGoals':'oneOfFor',
      //   'opal:hasBusinessCreationGoals':'oneOfFori',
      //   'opal:hasTrainingGoals':'oneOfFor',
      //   'opal:hasFindingHelpGoals':'oneOfFor'
      // }
      return 'un des 4 champs doit être rempli';
    }
    else{
      return undefined
    }
    // if (!values.firstName) {
    //     errors.firstName = 'The firstName is required';
    // }
    // if (!values.age) {
    //     // You can return translation keys
    //     errors.age = 'ra.validation.required';
    // } else if (values.age < 18) {
    //     // Or an object if the translation messages need parameters
    //     errors.age = {
    //         message: 'ra.validation.minValue',
    //         args: { min: 18 }
    //     };
    // }
    // console.log(errors);
    // return errors
  };

  let organization = null;
  if ( controllerProps?.record && controllerProps.record['pair:offeredBy'] ) {
    organization = controllerProps.record['pair:offeredBy'];
  }
  if ( newOrganization && organization !== newOrganization ) {
    organization = newOrganization;
  }

  return (
  <EditWithPermissions title={<Title />} {...props} >
    <TabbedForm>
      <FormTab label="Principal">
        <TextInput source="pair:label" fullWidth validate={[required()]} />
        <ReferenceInput
          source="pair:offeredBy"
          reference="Organization"
          validate={[required()]}
          fullWidth
          onChange={value => {
            setNewOrganization(value)
          }}
        >
            <AutocompleteInput optionText="pair:label" shouldRenderSuggestions={value => {
              return value && value.length > 1
            }}/>
        </ReferenceInput>
        <MarkdownInput source="pair:description" multiline fullWidth />
        <NumberInput source="opal:minimumAge" fullWidth />
        <NumberInput source="opal:maximumAge" fullWidth />
        <ReferenceArrayInput
          source="opal:hasDegreeLevel"
          reference="DegreeLevel"
          fullWidth
          helperText="Sélectionner tous les éléments éligibles au programme"
        >
          <SelectArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        <ReferenceArrayInput
          source="opal:hasGenders"
          reference="Gender"
          fullWidth
          initialValue={[
            process.env.REACT_APP_MIDDLEWARE_URL+'genders/homme',
            process.env.REACT_APP_MIDDLEWARE_URL+'genders/femme'
          ]}
          helperText="Sélectionner tous les éléments éligibles au programme"
        >
          <SelectArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        <BooleanInput source="opal:rqth" defaultValue={false} fullWidth />
        <BooleanInput source="opal:poleEmploi" defaultValue={false} fullWidth />
        <TextInput source="opal:otherInfos" fullWidth />
        <TextInput source="opal:duration" fullWidth />
        <ArrayInput source="opal:startingDates">
          <SimpleFormIterator>
            <DateInput label="Dates de démarrage"/>
          </SimpleFormIterator>
        </ArrayInput>
        <NumberInput source="opal:numberOfParticipants" fullWidth />
        <BooleanInput source="opal:financialParticipation" defaultValue={false} fullWidth />
        <TextInput type="url" source="opal:registerLink" fullWidth />
        <ReferenceArrayInput source="opal:hasTrainingMode" reference="TrainingMode" fullWidth validate={[required()]}>
          <SelectArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        { organization &&
          <ReferenceInput
            source="opal:hasContactPerson"
            reference="ContactPerson"
            fullWidth
            filter={{"pair:affiliates":organization}}
          >
            <SelectInput optionText={record => record["pair:firstName"] + ' ' + record["pair:lastName"]} allowEmpty resettable />
          </ReferenceInput>
        }
        { organization &&
          <ReferenceInput
            source="pair:offers"
            reference="TrainingSite"
            fullWidth
            filter={{"pair:offeredBy":organization}}
          >
            <SelectInput optionText="pair:label" allowEmpty resettable />
          </ReferenceInput>
        }
      </FormTab>
      <FormTab label="Objectifs">
        <ReferenceArrayInput source="opal:hasJobSearchGoals" reference="JobSearchGoal" fullWidth validate={validateMultiple}>
          <SelectArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        <ReferenceArrayInput source="opal:hasBusinessCreationGoals" reference="BusinessCreationGoal" fullWidth validate={validateMultiple}>
          <SelectArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        <ReferenceArrayInput source="opal:hasTrainingGoals" reference="TrainingGoal" fullWidth validate={validateMultiple}>
          <SelectArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        <ReferenceArrayInput source="opal:hasFindingHelpGoals" reference="FindingHelpGoal" fullWidth validate={validateMultiple}>
          <SelectArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        <BooleanInput source="opal:noIdea" defaultValue={false} fullWidth validate={[required()]} />
      </FormTab>
    </TabbedForm>
  </EditWithPermissions>
  );
}

export default ProgramEdit;

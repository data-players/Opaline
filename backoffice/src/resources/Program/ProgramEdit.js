import React, { useState } from 'react';

import { TextInput } from "ra-ui-materialui";
import {
  ArrayInput,
  BooleanInput,
  DateInput,
  FormTab,
  NumberInput,
  ReferenceInput,
  SelectArrayInput,
  SelectInput,
  SimpleFormIterator,
  TabbedForm,
  required,
  useEditController
} from 'react-admin';

import { MarkdownInput } from '@semapps/markdown-components'
import Title from '../commons/Title';
import { EditWithPermissions } from '@semapps/auth-provider';
import { ReferenceArrayInput } from '@semapps/semantic-data-provider';

export const ProgramEdit = props => {
  
  const controllerProps = useEditController(props);
  const [newOrganization, setNewOrganization] = useState();
  
  let organization = null;
  if ( controllerProps?.record && controllerProps.record['opal:programOfferedBy'] ) {
    organization = controllerProps.record['opal:programOfferedBy'];
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
          source="opal:programOfferedBy"
          reference="Organization"
          validate={[required()]}
          fullWidth
          onChange={event => setNewOrganization(event.target.value)}
        >
          <SelectInput optionText="pair:label" />
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
        <ReferenceInput
          source="opal:hasTrainingMode"
          reference="TrainingMode"
          validate={[required()]}
          fullWidth
        >
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
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
      </FormTab>
      <FormTab label="Objectifs">
        <ReferenceArrayInput source="opal:hasJobSearchGoals" reference="JobSearchGoal" fullWidth validate={[required()]}>
          <SelectArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        <ReferenceArrayInput source="opal:hasBusinessCreationGoals" reference="BusinessCreationGoal" fullWidth validate={[required()]}>
          <SelectArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        <ReferenceArrayInput source="opal:hasTrainingGoals" reference="TrainingGoal" fullWidth validate={[required()]}>
          <SelectArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        <ReferenceArrayInput source="opal:hasFindingHelpGoals" reference="FindingHelpGoal" fullWidth validate={[required()]}>
          <SelectArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        <BooleanInput source="opal:noIdea" defaultValue={false} fullWidth validate={[required()]} />
      </FormTab>
    </TabbedForm>
  </EditWithPermissions>
  );
}

export default ProgramEdit;

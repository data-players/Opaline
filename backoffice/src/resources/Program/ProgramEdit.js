import { default as React } from 'react';

import { TextInput } from "ra-ui-materialui";
import {
  BooleanInput,
  FormTab,
  NumberInput,
  ReferenceInput,
  SelectArrayInput,
  SelectInput,
  TabbedForm,
  required
} from 'react-admin';

import Title from '../commons/Title';
import { EditWithPermissions } from '@semapps/auth-provider';
import { ReferenceArrayInput } from '@semapps/semantic-data-provider';
    

export const programEdit = props => (
  <EditWithPermissions title={<Title />} {...props} >
    <TabbedForm>
      <FormTab label="Principal">
        <TextInput source="pair:label" fullWidth validate={[required()]} />
        <ReferenceInput
          source="opal:programOfferedBy"
          reference="Organization"
          validate={[required()]}
        >
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
        <NumberInput source="opal:minimumAge" fullWidth />
        <NumberInput source="opal:maximumAge" fullWidth />
        <ReferenceInput
          source="opal:hasDegreeLevel"
          reference="DegreeLevel"
        >
          <SelectInput optionText="pair:label" />
        </ReferenceInput>
        <ReferenceArrayInput source="opal:hasGenders" reference="Gender" fullWidth>
          <SelectArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        <BooleanInput source="opal:rqth" defaultValue={false} fullWidth />
        <BooleanInput source="opal:poleEmploi" defaultValue={false} fullWidth />
      </FormTab>
      <FormTab label="Objectifs">
        <ReferenceArrayInput source="opal:hasJobSearchGoals" reference="JobSearchGoal" fullWidth>
          <SelectArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        <ReferenceArrayInput source="opal:hasBusinessCreationGoals" reference="BusinessCreationGoal" fullWidth>
          <SelectArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        <ReferenceArrayInput source="opal:hasTrainingGoals" reference="TrainingGoal" fullWidth>
          <SelectArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        <ReferenceArrayInput source="opal:hasFindingHelpGoals" reference="FindingHelpGoal" fullWidth>
          <SelectArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        <BooleanInput source="opal:noIdea" defaultValue={false} fullWidth />
      </FormTab>
    </TabbedForm>
  </EditWithPermissions>
);

export default programEdit;

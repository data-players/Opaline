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

import { MarkdownInput } from '@semapps/markdown-components'
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
          fullWidth
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
        >
          <SelectArrayInput optionText="pair:label" />
        </ReferenceArrayInput>
        <BooleanInput source="opal:rqth" defaultValue={false} fullWidth />
        <BooleanInput source="opal:poleEmploi" defaultValue={false} fullWidth />
        <TextInput source="opal:otherInfos" fullWidth />
        <TextInput source="opal:duration" fullWidth />
        <BooleanInput source="opal:financialParticipation" defaultValue={false} fullWidth />
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

export default programEdit;

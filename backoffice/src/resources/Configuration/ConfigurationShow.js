import React from 'react';
import { Show } from "@semapps/archipelago-layout";
import { MarkdownField } from '@semapps/markdown-components'
import Title from "../commons/Title";

const ConfigurationShow = props => (
  <Show title={<Title />} {...props}>
    <MarkdownField source="pair:description"/>
  </Show>
);

export default ConfigurationShow;
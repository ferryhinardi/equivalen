import React from 'react';
import {ActivityIndicator} from 'react-native';
import Page from './Page';

const Loading = () => (
  <Page backgroundColor="#ffffffbf">
    <ActivityIndicator size="large" />
  </Page>
);

export default Loading;

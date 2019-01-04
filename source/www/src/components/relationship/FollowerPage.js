// @flow

import React from 'react';
import FollowerListView from './FollowerListView';
import { Page } from '../common';

const FollowerPage = () => (
  <Page
    isFullWidth
    withContextProvider
    justifyContent="flex-start">
    <FollowerListView />
  </Page>
);

export default FollowerPage;

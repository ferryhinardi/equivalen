// @flow

import React from 'react';
import SummaryArchiveListView from './SummaryArchiveListView';
import { Page } from '../common/Page';
import { getQueries } from '../../utils/router';

type Props = {};

const SummaryArchivePage = (props: Props) => {
  // console.log('getQueries(props)', getQueries(props));
  return (
    <Page
      isFullWidth
      withContextProvider
      justifyContent="flex-start">
      <SummaryArchiveListView />
    </Page>
  );
};

export default SummaryArchivePage;

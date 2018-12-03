// @flow

import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ChapterListView from './ChapterListView';
import { Page } from '../common/Page';
import { getQueries } from '../../utils/router';

type Props = {};

const QUERY_GET_CHAPTERS = gql`
  query getChapters {
    chapters {
      id
      name
    }
  }
`;

const ChapterPage = (props: Props) => {
  const { curriculumType, isArchive } = getQueries(props);

  return (
    <Page
      isFullWidth
      withContextProvider
      justifyContent="flex-start">
      <Query
        query={QUERY_GET_CHAPTERS}
        variables={{ curriculumName: curriculumType }}>
        {({ data, loading }) => (
          <ChapterListView
            curriculumType={curriculumType}
            isArchive={isArchive}
            data={data.chapters}
            loading={loading}
          />
        )}
      </Query>
    </Page>
  );
};

export default ChapterPage;

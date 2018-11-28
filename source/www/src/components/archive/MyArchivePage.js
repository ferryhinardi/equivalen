// @flow

import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';
import MyArchiveListView from './MyArchiveListView';
import { Page, PageConsumer } from '../common/Page';

type Props = {};

const QUERY_GET_ARCHIVES = gql`
  query getArchives {
    archives {
      name
      curriculum {
        name
      }
      questionType {
        name
      }
      packages {
        name
        totalQuestion
      }
      createdAt
    }
  }
`;

const MyArchivePage = (props: Props) => (
  <Page
    isFullWidth
    withContextProvider
    justifyContent="flex-start">
    <PageConsumer>
      {({ currentUser, loading: loadingUser }) => (
        <Query query={QUERY_GET_ARCHIVES}>
          {({ data, loading: loadingArchive }) => {
            const loading = loadingUser && loadingArchive;
            const archivesData = get(data, 'archives');

            return (
              <MyArchiveListView
                user={currentUser}
                data={archivesData}
                loading={loading}
                isStudent={currentUser.isStudent}
                isTeacher={currentUser.isTeacher}
                props={props}
              />
            )
          }}
        </Query>
      )}
    </PageConsumer>
  </Page>
);

export default MyArchivePage;

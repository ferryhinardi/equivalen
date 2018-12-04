// @flow

import React from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';
import MyArchiveListView from './MyArchiveListView';
import { Page, PageConsumer } from '../common/Page';
import { QUERY_GET_ARCHIVES } from '../gql.shared';

type Props = {};

const MyArchivePage = (props: Props) => (
  <Page
    isFullWidth
    withContextProvider
    justifyContent="flex-start">
    <PageConsumer>
      {({ currentUser, loading: loadingUser }) => (
        <Query query={QUERY_GET_ARCHIVES} fetchPolicy="network-only">
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

// @flow

import React from 'react';
import { Query } from 'react-apollo';
import MyArchiveListView from './MyArchiveListView';
import { Page, PageConsumer } from '../common/Page';
import { QUERY_GET_ARCHIVES } from '../gql.shared';
import { PAGE_SIZE } from '../../constants';

type Props = {};

const MyArchivePage = (props: Props) => (
  <Page
    isFullWidth
    withContextProvider
    justifyContent="flex-start">
    <PageConsumer>
      {({ currentUser, loading: loadingUser }) => (
        <Query
          query={QUERY_GET_ARCHIVES}
          variables={{ pageSize: PAGE_SIZE, offset: 0 }}
          notifyOnNetworkStatusChange>
          {({ data, loading: loadingArchive, fetchMore }) => {
            const loading = loadingUser && loadingArchive;

            return (
              <MyArchiveListView
                user={currentUser}
                isStudent={currentUser.isStudent}
                isTeacher={currentUser.isTeacher}
                props={props}
                data={data}
                loading={loading}
                onLoadMore={() => {
                  fetchMore({
                    variables: { offset: data.archives.length + 1 },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                      if (!fetchMoreResult || fetchMoreResult.archives.length === 0) {
                        return prevResult;
                      }

                      return {
                        archives: prevResult.archives.concat(fetchMoreResult.archives),
                      };
                    },
                  });
                }}
              />
            )
          }}
        </Query>
      )}
    </PageConsumer>
  </Page>
);

export default MyArchivePage;

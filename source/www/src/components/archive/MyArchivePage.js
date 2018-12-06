// @flow

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import MyArchiveListView from './MyArchiveListView';
import { Page, PageConsumer } from '../common/Page';
import { PAGE_SIZE } from '../../constants';
import { getQueries } from '../../utils/router';
import { QUERY_GET_ARCHIVES } from '../gql.shared';

type Props = {};

class MyArchivePage extends Component<Props> {
  render() {
    const { evaluation } = getQueries(this.props);
    let variables = { limit: PAGE_SIZE, offset: 0 };

    if (evaluation) {
      variables = {
        ...variables,
        evaluation: { type: evaluation },
      };
    }

    return (
      <Page
        isFullWidth
        withContextProvider
        justifyContent="flex-start">
        <PageConsumer>
          {({ currentUser, loading: loadingUser }) => (
            <Query
              query={QUERY_GET_ARCHIVES}
              variables={variables}
              notifyOnNetworkStatusChange>
              {({ data, loading: loadingArchive, fetchMore }) => {
                const loading = loadingUser && loadingArchive;

                return (
                  <MyArchiveListView
                    user={currentUser}
                    isStudent={currentUser.isStudent}
                    isTeacher={currentUser.isTeacher}
                    props={this.props}
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
  }
}

export default MyArchivePage;

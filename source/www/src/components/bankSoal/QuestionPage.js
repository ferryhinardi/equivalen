// @flow

import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import QuestionListView from './QuestionListView';
import { Page } from '../common/Page';
import { getQueries } from '../../utils/router';
import { PAGE_SIZE } from '../../constants';

type Props = {};

const QUERY_GET_QUESTIONS = gql`
  query getQuestions($pageSize: Int!, $offset: Int!) {
    questions(pageSize: $pageSize, offset: $offset) {
      id
      content
      options {
        content
        option {
          name
        }
      }
      used
      createdBy {
        id
        fullName
      }
      answer
    }
  }
`;

const QuestionPage = (props: Props) => {
  const { chapter, isArchive } = getQueries(props);

  return (
    <Page
      isFullWidth
      withContextProvider
      justifyContent="flex-start">
      <Query
        query={QUERY_GET_QUESTIONS}
        variables={{ pageSize: PAGE_SIZE, offset: 0 }}
        notifyOnNetworkStatusChange>
        {({ data, loading, fetchMore }) => (
          <QuestionListView
            chapter={chapter}
            isArchive={isArchive}
            data={data}
            loading={loading}
            onLoadMore={() => {
              fetchMore({
                variables: { offset: data.questions.length + 1 },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  if (!fetchMoreResult || fetchMoreResult.questions.length === 0) {
                    return prevResult;
                  }

                  return {
                    questions: prevResult.questions.concat(fetchMoreResult.questions),
                  };
                },
              });
            }}
          />
        )}
      </Query>
    </Page>
  );
};

export default QuestionPage;

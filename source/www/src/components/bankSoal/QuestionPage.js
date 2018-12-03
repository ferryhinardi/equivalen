// @flow

import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import QuestionListView from './QuestionListView';
import { Page } from '../common/Page';
import { getQueries } from '../../utils/router';

type Props = {};

const QUERY_GET_QUESTIONS = gql`
  query getQuestions {
    questions {
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
  const { curriculumType, chapter, isArchive } = getQueries(props);

  return (
    <Page
      isFullWidth
      withContextProvider
      justifyContent="flex-start">
      <Query query={QUERY_GET_QUESTIONS}>
        {({ data, loading }) => (
          <QuestionListView
            data={data.questions}
            loading={loading}
            curriculumType={curriculumType}
            chapter={chapter}
            isArchive={isArchive}
          />
        )}
      </Query>
    </Page>
  );
};

export default QuestionPage;

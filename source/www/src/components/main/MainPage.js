// @flow
import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';
import MainBoard from './MainBoard';
import { Page } from '../common';
import { PathConsumer } from '../context/path.context';
import Colors from '../../utils/colors';
import { getQueries } from '../../utils/router';

type Props = {};

const QUERY_GET_DATA = gql`
  query GetData($id: ID) {
    archive(id: $id) {
      course {
        imageUrl
      }
    }
  }
`;
const MUTATION_GENERATE_RANDOM = gql`
  mutation GenerateRandom($id: ID) {
    generateRandomQuestion(archiveId: $id) {
      orderNo
      question {
        id
        content
        options {
          id
          content
          option {
            name
          }
        }
      }
    }
  }
`;

const MainPage = (props: Props) => {
  const { archiveId } = getQueries(props);

  return (
    <Page
      isFullWidth
      withContextProvider
      backgroundColor={Colors.mainBackground}
      alignItems="flex-start"
      justifyContent="flex-start">
      <PathConsumer>
        {({ paths }) => (
          <Query query={QUERY_GET_DATA} variables={{ id: archiveId }}>
            {({ data, loading: loadingData }) => {
              const logoPath = get(data, 'archive.course.imageUrl', '');
              const courseLogo = `${paths.STORAGE_URL}/${logoPath}`;

              return !loadingData && (
                <Mutation mutation={MUTATION_GENERATE_RANDOM}>
                  {(mutate, { loading }) => (
                    <MainBoard
                      logo={courseLogo}
                      requestGenerateRandQuestion={() => mutate({ variables: { id: archiveId } })}
                      loadingGenerate={loading}
                      archiveId={archiveId}
                    />
                  )}
                </Mutation>
              );
            }}
          </Query>
        )}
      </PathConsumer>
    </Page>
  );
};

export default MainPage;

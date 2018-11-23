// @flow

import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';
import { Page, Loading } from '../common';
import MenuListView from './MenuListView';
import Colors from '../../utils/colors';

type Props = {};

const QUERY_GET_CURRENT_USER = gql`
  query getCurrentUser {
    currentUser {
      isStudent
      isTeacher
    }
  }
`;

const MenuPage = (props: Props) =>
(
  <Query query={QUERY_GET_CURRENT_USER}>
    {({ data, loading }) => {
        if (loading) {
          return <Loading transparent />;
        }

        const currentUser = get(data, 'currentUser', {});
        let backgroundColor = null;

        if (currentUser.isStudent) {
          backgroundColor = Colors.yellowBackground;
        } else if (currentUser.isTeacher) {
          backgroundColor = Colors.grey;
        }

        return (
          <Page
            backgroundColor={backgroundColor}
            isFullWidth
            justifyContent="flex-start">
            <MenuListView
              isStudent={currentUser.isStudent}
              isTeacher={currentUser.isTeacher}
              props={props}
            />
          </Page>
        );
    }}
  </Query>
);

export default MenuPage;

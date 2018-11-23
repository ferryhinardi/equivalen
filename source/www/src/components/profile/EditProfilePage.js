// @flow

import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';
import { Page, Loading } from '../common';
import EditProfileView from './EditProfileView';
import Colors from '../../utils/colors';

type Props = {};

const QUERY_GET_CURRENT_USER = gql`
  query getCurrentUser {
    currentUser {
      fullName
      isStudent
      isTeacher
      placeBod
      dateBod
      phoneNumber
      email
      gender {
        name
      }
      userSchools {
        school {
          name
        }
      }
    }
  }
`;

const EditProfilePage = (props: Props) =>
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
          <EditProfileView
            user={currentUser}
            isStudent={currentUser.isStudent}
            isTeacher={currentUser.isTeacher}
          />
        </Page>
      );
    }}
  </Query>
);

export default EditProfilePage;

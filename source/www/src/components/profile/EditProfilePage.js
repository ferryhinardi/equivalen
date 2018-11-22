// @flow

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';
import { Page, Loading } from '../common';
import EditProfileView from './EditProfileView';
import { getQueries } from '../../utils/router';
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

class EditProfilePage extends Component<Props> {
  render() {
    const { isStudent, isTeacher } = getQueries(this.props);
    let backgroundColor = null;

    if (isStudent) {
      backgroundColor = Colors.yellowBackground;
    }
    if (isTeacher) {
      backgroundColor = Colors.grey;
    }

    return (
      <Page
        backgroundColor={backgroundColor}
        isFullWidth
        justifyContent="flex-start">
        <Query query={QUERY_GET_CURRENT_USER} fetchPolicy="network-only">
          {({ data, loading }) => {
            if (loading) {
              return <Loading transparent />;
            }

            const currentUser = get(data, 'currentUser', {});

            return (
              <EditProfileView
                user={currentUser}
                isStudent={isStudent}
                isTeacher={isTeacher}
              />
            );
          }}
        </Query>
      </Page>
    );
  }
}

export default EditProfilePage;

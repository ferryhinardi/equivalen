// @flow

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Query } from 'react-apollo';
import { NotificationManager } from 'react-notifications';
import gql from 'graphql-tag';
import get from 'lodash/get';
import FormGeneric from './FormGeneric';
import FormStudent from './FormStudent';
import FormTeacher from './FormTeacher';
import { RouterContextConsumer } from '../context/router.context';
import { Page, WelcomeMessage, Loading } from '../common';
import { setStore } from '../../utils/store';
import Colors from '../../utils/colors';
import { getQueries } from '../../utils/router';
import type { History } from '../types.shared';

type Props = { history: Object };
type State = {};

const styles = {
  title: {
    color: Colors.primary,
    paddingVertical: 8,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
};

const QUERY_GET_USER = gql`
  query getUser($phoneNumber: String) {
    user(phoneNumber: $phoneNumber) {
      token
      phoneNumber
      userProfile {
        id
      }
    }
  }
`;

const backroundIntro = require('../../images/assets/backround_intro.png');
class RegistrationPage extends Component<Props, State> {
  render() {
    let { phoneNumber, isStudent, isTeacher } = getQueries(this.props);

    return (
      <Page backgroundImage={backroundIntro}>
        <WelcomeMessage />
        <Text style={styles.title}>FORM PENDAFTARAN</Text>
        <Query query={QUERY_GET_USER} variables={{ phoneNumber }} fetchPolicy="network-only">
          {({ loading, data }) => {
            if (loading) return <Loading />;

            return (
              <RouterContextConsumer>
                {({ history }: { history: History }) => {
                  const registeredPhoneNumber = get(data, 'user.phoneNumber');

                  if (registeredPhoneNumber) {
                    const username = get(data, 'user.username');
                    const token = get(data, 'user.token');
                    const userProfile = get(data, 'user.userProfile');
                    setStore('username', username);
                    setStore('token', token);

                    if (isStudent) {
                      return <FormStudent history={history} />;
                    }

                    if (isTeacher) {
                      return <FormTeacher history={history} />;
                    }

                    if (!userProfile) {
                      history.transitionTo('/intro', { phoneNumber: registeredPhoneNumber });
                    } else {
                      NotificationManager.success('Berhasil', 'Registrasi Sukses');
                      history.transitionTo('/temp-login');
                    }
                  }

                  return <FormGeneric history={history} phoneNumber={phoneNumber} />;
                }}
              </RouterContextConsumer>
            );
          }}
        </Query>
      </Page>
    );
  }
}

export default RegistrationPage;

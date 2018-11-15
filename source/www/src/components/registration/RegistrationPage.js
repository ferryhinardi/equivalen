// @flow

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import R from 'ramda';
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
      <Page backgroundColor={Colors.grey} backgroundImage={backroundIntro}>
        <WelcomeMessage />
        <Text style={styles.title}>FORM PENDAFTARAN</Text>
        <Query query={QUERY_GET_USER} variables={{ phoneNumber }}>
          {({ loading, data: { user } }) => {
            if (loading === true) return <Loading />;

            return (
              <RouterContextConsumer>
                {({ history }: { history: History }) => {
                  const isRegistered = R.prop('phoneNumber', user);
                  let renderer = (
                    <FormGeneric history={history} phoneNumber={phoneNumber} />
                  );

                  if (isRegistered) {
                    const username = R.prop('username', user);
                    const token = R.prop('token', user);
                    setStore('username', username);
                    setStore('token', token);
                    /**
                     * By pass from account kit
                     */
                    if (typeof phoneNumber === 'undefined') {

                      if (isStudent) {
                        renderer = (
                          <FormStudent history={history} />
                        );
                      } else if (isTeacher) {
                        renderer = (
                          <FormTeacher history={history} />
                        );
                      }

                    } else if (!user.userProfile) {
                      /**
                       * Remove pushState @phoneNumber to by pass when go to next form
                       */
                      history.push('/intro');
                    } else {
                      history.transitionTo('/main-menu');
                    }

                  }

                  return renderer;
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

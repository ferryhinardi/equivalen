// @flow

import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import R from 'ramda';
import { Page, WelcomeMessage } from '../common';
import { FormEngine } from '../form';
import Colors from '../../utils/colors';
import { getMachineId } from '../../utils/machineSpecs';
import type { History } from '../types.shared';
import { setStore } from '../../utils/store';

type Props = {
  history: History,
};

type State = {
  deviceId: ?String,
};

const backroundIntro = require('../../images/assets/backround_intro.png');
const MUTATION_LOGIN = gql`
  mutation Login($auth: LoginInput) {
    login(auth: $auth) {
      user {
        id
        username
      }
      token
    }
  }
`;
class LoginPage extends Component<Props, State> {
  state = {
    deviceId: null,
  };

  async componentDidMount() {
    const deviceId = await getMachineId();

    this.setState({ deviceId });
  }

  _fieldMap = [
    {key: 'username', type: 'text', placeholder: 'Username'},
    {key: 'password', type: 'password', placeholder: 'Kata sandi'},
    {
      key: 'forgotPassword',
      type: 'link',
      text: 'LUPA KATA SANDI',
      to: '/info/?page=forgot-password',
      align: 'left',
      style: {
        textDecorationLine: 'none',
        fontStyle: 'italic',
        fontSize: 14,
        fontWeight: 'bold',
      },
    },
    {
      key: 'login',
      type: 'submit',
      text: 'LANJUTKAN MISI',
      style: {
        backgroundColor: Colors.primary,
        padding: 16,
      },
      textStyle: {
        color: Colors.white,
        fontSize: 16,
        textAlign: 'center',
      },
    },
    {
      key: 'registration',
      type: 'link',
      text: 'SAYA INGIN BERGABUNG',
      to: '/account-kit',
      style: {
        textDecorationLine: 'none',
        fontSize: 12,
        textAlign: 'center',
      },
    },
  ];

  onSubmit = (data: Object, mutation: any) => {
    const loginInput = {
      username: data.username,
      password: data.password,
    };

    mutation({ variables: { auth: loginInput } });
  };

  render() {
    return (
      <Page backgroundColor={Colors.grey} backgroundImage={backroundIntro}>
        <WelcomeMessage />
        <Mutation
          update={(cache, { data }) => {
            const token = R.path(['login', 'token'], data);
            const username = R.pathOr('', ['login', 'user', 'username'], data);

            if (token) {
              setStore('username', username);
              setStore('token', token).then(() => {
                this.props.history.replace('/main-menu');
              });
            }
          }}
          mutation={MUTATION_LOGIN}
        >
          {(mutate, { loading, error }) => (
            <FormEngine
              fields={this._fieldMap}
              loading={loading}
              error={error}
              onSubmit={(data) => this.onSubmit(data, mutate)}
            />
          )}
        </Mutation>
      </Page>
    );
  }
}

export default LoginPage;

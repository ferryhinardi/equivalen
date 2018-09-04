// @flow

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { RouterContextConsumer } from '../context/router.context';
import { Page, WelcomeMessage, Loading } from '../common';
import { FormEngine } from '../form';
import Colors from '../../utils/colors';
import { getQueries } from '../../utils/router';

type Props = {};
type State = {loading: boolean};

const styles = {
  title: {
    color: Colors.primary,
    paddingVertical: 8,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
};

const mutationForm1 = gql`
  mutation RegisterViaAccountKit($user: RegisterUserInput!) {
    registerViaAccountKit(user: $user) {
      user {
        id
      }
      token
    }
  }
`;

const backroundIntro = require('../../images/assets/backround_intro.png');
class RegistrationPage extends Component<Props, State> {
  state = {
    loading: false,
  };

  getFieldMap = (fields: { phoneNumber: string }) => [
    { key: 'username', type: 'text', placeholder: 'Nama lengkap' },
    { key: 'email', type: 'email', placeholder: 'Email' },
    { key: 'phone', type: 'text', placeholder: 'Nomor handphone', value: fields.phoneNumber, disabled: true },
    { key: 'password', type: 'password', placeholder: 'Kata sandi' },
    { key: 'pob', type: 'text', placeholder: 'Tempat Lahir' },
    { key: 'dob', type: 'datepicker', placeholder: 'Tanggal Lahir' },
    {
      key: 'registration',
      type: 'submit',
      text: 'JALANKAN MISI',
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
      key: 'login',
      type: 'link',
      text: 'SAYA SUDAH BERGABUNG',
      to: '/login',
      style: {
        textDecorationLine: 'none',
        fontSize: 12,
        textAlign: 'center',
      },
    },
  ];

  onSubmit = (data: Object, mutation: any) => {
    this.setState({ loading: true })
    const registerUserInput = {
      username: data.username,
      email: data.email,
      phoneNumber: data.phone,
      password: data.password,
      placeBod: data.pob,
      dateBod: data.dob,
    };

    mutation({ variables: { user: registerUserInput } });
  };

  render() {
    const { phoneNumber } = getQueries(this.props);

    return (
      <Page backgroundColor={Colors.grey} backgroundImage={backroundIntro}>
        <WelcomeMessage />
        {this.state.loading && <Loading transparent />}
        <Text style={styles.title}>FORM PENDAFTARAN</Text>
        <RouterContextConsumer>
          {({ history }) => (
            <Mutation
              update={(cache, { data: { registerViaAccountKit } }) => {
                console.log('registerViaAccountKit', registerViaAccountKit); // eslint-disable-line
                this.setState({ loading: false }, () => {
                  history.transitionTo('/intro', {});
                });
              }}
              mutation={mutationForm1}>
              {(registerViaAccountKit) => (
                <FormEngine
                  fields={this.getFieldMap({ phoneNumber })}
                  onSubmit={(data) => this.onSubmit(data, registerViaAccountKit)}
                />
              )}
            </Mutation>
          )}
        </RouterContextConsumer>
      </Page>
    );
  }
}

export default RegistrationPage;

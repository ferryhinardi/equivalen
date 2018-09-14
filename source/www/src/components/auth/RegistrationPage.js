// @flow

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import R from 'ramda';
import { RouterContextConsumer } from '../context/router.context';
import { Page, WelcomeMessage, Loading } from '../common';
import { FormEngine } from '../form';
import Colors from '../../utils/colors';
import { getQueries } from '../../utils/router';
import { setStore } from '../../utils/store';

type Props = {};
type State = { loading: boolean };

const styles = {
  title: {
    color: Colors.primary,
    paddingVertical: 8,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
};

const QUERY_GET_SCHOOL = gql`
  query getSchoolsQuery {
    schools {
      id
      name
      city
      province
      district
    }
  }
`;


const MUTATION_ACCOUNT_KIT = gql`
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

  getFieldMapGenericForm = (fields: { phoneNumber: string }) => [
    { key: 'username', type: 'text', placeholder: 'Nama lengkap' },
    { key: 'email', type: 'email', placeholder: 'Email' },
    { key: 'phone', type: 'text', placeholder: 'Nomor handphone', value: fields.phoneNumber, disabled: true },
    { key: 'password', type: 'password', placeholder: 'Kata sandi' },
    { key: 'pob', type: 'text', placeholder: 'Tempat Lahir' },
    { key: 'dob', type: 'datepicker', placeholder: 'Tanggal Lahir' },
  ];

  fieldMapSpecificForm = [
    { key: 'nisnNumber', type: 'text', placeholder: 'Nomor NISN' },
    { key: 'nikNumber', type: 'text', placeholder: 'Nomor NIK' },
    {
      key: 'schools',
      type: 'select',
      placeholder: 'Pilih Sekolah',
      query: QUERY_GET_SCHOOL,
      fieldMap: { value: 'id', label: 'name' },
    },
  ];

  fieldSubmitButton = [
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
    this.setState({ loading: true });
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
    const { phoneNumber, isSpecificForm } = getQueries(this.props);
    let fields = [];

    if (isSpecificForm) {
      fields = this.fieldMapSpecificForm;
    } else {
      fields = this.getFieldMapGenericForm({ phoneNumber });
    }

    fields = [
      ...fields,
      ...this.fieldSubmitButton,
    ];

    return (
      <Page backgroundColor={Colors.grey} backgroundImage={backroundIntro}>
        <WelcomeMessage />
        {this.state.loading && <Loading transparent />}
        <Text style={styles.title}>FORM PENDAFTARAN</Text>
        <RouterContextConsumer>
          {({ history }) => (
            <Mutation
              update={(cache, { data: { registerViaAccountKit } }) => {
                const userId = R.path(['user', 'id'], registerViaAccountKit);

                setStore('userId', userId).then(() => {
                  this.setState({ loading: false }, () => {
                    if (isSpecificForm) {
                      history.transitionTo('/main-menu');
                    } else {
                      history.transitionTo('/intro');
                    }
                  });
                });
              }}
              mutation={MUTATION_ACCOUNT_KIT}>
              {(registerViaAccountKit) => (
                <FormEngine
                  fields={fields}
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

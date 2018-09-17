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

const MUTATION_REGISTRATION_USER_STUDENT = gql`
  mutation RegisterUserStudent(
    $userProfile: UserProfileInput,
    $userSchool: UserSchoolInput,
    $userStudent: UserStudentInput
  ) {
    registerUserStudent(userProfile: $userProfile, userSchool: $userSchool, userStudent: $userStudent) {
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
    { key: 'nisnNumber', type: 'number', placeholder: 'Nomor NISN' },
    { key: 'nikNumber', type: 'number', placeholder: 'Nomor NIK' },
    { key: 'startYear', type: 'number', placeholder: 'Tahun Masuk' },
    { key: 'endYear', type: 'number', placeholder: 'Tahun Lulus' },
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
    const { isSpecificForm, isStudent } = getQueries(this.props);

    this.setState({ loading: true });

    let variables = {};

    if (isSpecificForm && isStudent) {
      const userProfile = {
        nikNumber: data.nikNumber,
      };
      const userStudent = {
        nisnNumber: data.nisnNumber,
      };
      const userSchool = {
        startYear: data.startYear,
        endYear: data.endYear,
        school: {
          name: data.schools.name,
          city: data.schools.city,
          province: data.schools.province,
          district: data.schools.district,
        },
      };

      variables = {
        userProfile,
        userStudent,
        userSchool,
      };
    } else {
      variables = {
        user: {
          username: data.username,
          email: data.email,
          phoneNumber: data.phone,
          password: data.password,
          placeBod: data.pob,
          dateBod: data.dob,
        },
      };
    }

    mutation({ variables });
  };

  render() {
    const { phoneNumber, isSpecificForm } = getQueries(this.props);
    let mutation;
    let fields = [];

    if (isSpecificForm) {
      fields = this.fieldMapSpecificForm;
      mutation = MUTATION_REGISTRATION_USER_STUDENT;
    } else {
      fields = this.getFieldMapGenericForm({ phoneNumber });
      mutation = MUTATION_ACCOUNT_KIT;
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
              update={(cache, { data }) => {
                const result = isSpecificForm ? data.registerUserStudent : data.registerViaAccountKit;
                const token = R.prop('token', result);

                setStore('token', token).then(() => {
                  this.setState({ loading: false }, () => {
                    if (isSpecificForm) {
                      history.transitionTo('/main-menu');
                    } else {
                      history.transitionTo('/intro');
                    }
                  });
                });
              }}
              mutation={mutation}>
              {(mutate) => (
                <FormEngine
                  fields={fields}
                  onSubmit={(data) => this.onSubmit(data, mutate)}
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

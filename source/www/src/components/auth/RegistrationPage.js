// @flow

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import R from 'ramda';
import { RouterContextConsumer } from '../context/router.context';
import { Page, WelcomeMessage } from '../common';
import { FormEngine } from '../form';
import Colors from '../../utils/colors';
import { getQueries } from '../../utils/router';
import { setStore } from '../../utils/store';
import type { History } from '../types.shared';

type Props = {};
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
        username
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
      username
      token
    }
  }
`;

const backroundIntro = require('../../images/assets/backround_intro.png');
class RegistrationPage extends Component<Props, State> {
  getFieldMapGenericForm = (fields: { phoneNumber: string }) => [
    { key: 'username', type: 'text', placeholder: 'Username', rules: ['required'] },
    { key: 'fullname', type: 'text', placeholder: 'Nama lengkap', rules: ['required'] },
    { key: 'email', type: 'email', placeholder: 'Email' },
    { key: 'phone', type: 'text', placeholder: 'Nomor handphone', defaultValue: fields.phoneNumber, disabled: true },
    { key: 'password', type: 'password', placeholder: 'Kata sandi', rules: ['required'] },
    { key: 'pob', type: 'text', placeholder: 'Tempat Lahir' },
    { key: 'dob', type: 'datepicker', placeholder: 'Tanggal Lahir' },
  ];

  fieldMapSpecificForm = [
    { key: 'nisnNumber', type: 'number', placeholder: 'Nomor NISN', rules: ['required'] },
    { key: 'nikNumber', type: 'number', placeholder: 'Nomor NIK', rules: ['required'] },
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
          fullName: data.fullname,
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
    return (
      <Page backgroundColor={Colors.grey} backgroundImage={backroundIntro}>
        <WelcomeMessage />
        <Text style={styles.title}>FORM PENDAFTARAN</Text>
        <RouterContextConsumer>
          {({ history }: { history: History }) => {
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
              <Mutation
                update={(cache, { data }) => {
                  const result = isSpecificForm ? data.registerUserStudent : data.registerViaAccountKit;
                  const token = R.prop('token', result);
                  const username = isSpecificForm ?
                    R.propOr('', 'username', result) :
                    R.pathOr('', ['registerViaAccountKit', 'username'], result);

                  setStore('username', username);
                  setStore('token', token).then(() => {
                    if (isSpecificForm) {
                      history.transitionTo('/main-menu');
                    } else {
                      history.transitionTo('/intro');
                    }
                  });
                }}
                mutation={mutation}>
                {(mutate, { loading, error }) => (
                  <FormEngine
                    fields={fields}
                    loading={loading}
                    error={error && R.prop('0', error)}
                    onSubmit={(data) => this.onSubmit(data, mutate)}
                  />
                )}
              </Mutation>
            );
          }}
        </RouterContextConsumer>
      </Page>
    );
  }
}

export default RegistrationPage;

// @flow

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import R from 'ramda';
import { RouterContextConsumer } from '../context/router.context';
import { Page, WelcomeMessage, Loading } from '../common';
import { FormEngine } from '../form';
import Colors from '../../utils/colors';
import { getQueries } from '../../utils/router';
import { setStore } from '../../utils/store';
import type { History, Option } from '../types.shared';

type Props = {};
type State = { addOthersOption: boolean };

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
  query getUser {
    user {
      phoneNumber
      userProfile {
        id
      }
    }
  }
`;

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
  state = {
    addOthersOption: true,
  };

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
      options: (options: Array<Option>) => {
        let opts = [];

        if (this.state.addOthersOption) {
          opts = R.concat(options, [{ label: 'Others', value: 'others' }]);
        } else {
          opts = options;
        }

        return opts;
      },
      onChange: (selected: Option) => {
        if (selected.value === 'others') {
          this.fieldMapSpecificForm = R.concat(this.fieldMapSpecificForm, this.fieldMapSchoolInput);

          this.setState({ addOthersOption: false });
        } else {
          this.fieldMapSpecificForm = R.difference(this.fieldMapSpecificForm, this.fieldMapSchoolInput);

          this.setState({ addOthersOption: true });
        }
      },
    },
  ];

  fieldMapSchoolInput = [
    { key: 'schoolName', type: 'text', placeholder: 'Nama Sekolah', rules: ['required'] },
    { key: 'schoolCity', type: 'text', placeholder: 'Kota', rules: ['required'] },
    { key: 'schoolProvince', type: 'text', placeholder: 'Provinsi', rules: ['required'] },
    { key: 'schoolDistrict', type: 'text', placeholder: 'Kecamatan', rules: ['required'] },
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

  onSubmit = (data: Object, mutation: any, passToSpecificForm: boolean) => {
    const { isSpecificForm, isStudent } = getQueries(this.props);

    let variables = {};

    if (passToSpecificForm || (isSpecificForm && isStudent)) {
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
          name: data.schools.name || data.schoolName,
          city: data.schools.city || data.schoolCity,
          province: data.schools.province || data.schoolProvince,
          district: data.schools.district || data.schoolDistrict,
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
        <Query query={QUERY_GET_USER}>
          {({ loading, data }) => {
            if (loading === true) return <Loading />;

            const { user } = data;

            return (
              <RouterContextConsumer>
                {({ history }: { history: History }) => {
                  let { phoneNumber, isSpecificForm } = getQueries(this.props);
                  let passToSpecificForm = false;

                  if (user.phoneNumber) {
                    phoneNumber = user.phoneNumber;

                    if (!user.userProfile) {
                      isSpecificForm = true;
                      passToSpecificForm = true;
                    } else {
                      alert('Anda sudah pernah mendaftar...');
                    }
                  }

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
                          onSubmit={(data) => this.onSubmit(data, mutate, passToSpecificForm)}
                        />
                      )}
                    </Mutation>
                  );
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

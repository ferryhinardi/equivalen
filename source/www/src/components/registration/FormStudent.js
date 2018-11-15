// @flow

import React, { Component } from 'react';
import R from 'ramda';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { FormEngine } from '../form';
import Colors from '../../utils/colors';
import { setStore } from '../../utils/store';
import { getMachineId, getSystemInformation } from '../../utils/machineSpecs';
import { QUERY_GET_PROVINCE, QUERY_GET_CITY, QUERY_GET_DISTRICT } from '../gql.shared';
import type { History, Option } from '../types.shared';

type Props = {
  history: History,
};
type State = {
  addOthersOption: boolean,
  machineSpec: ?{
    deviceId: string,
    hostname: string,
    platform: string,
  },
  selectedProvince: ?number,
  selectedCity: ?number,
};

const QUERY_GET_SCHOOL = gql`
  query getSchools {
    schools {
      id
      name
      province {
        id
        name
      }
      city {
        id
        name
      }
      district {
        id
        name
      }
    }
  }
`;

const MUTATION_REGISTRATION_USER_STUDENT = gql`
  mutation RegisterUserStudent(
    $userProfile: UserProfileInput,
    $userSchool: UserSchoolInput,
    $userStudent: UserStudentInput,
    $userDevice: UserDeviceInput
  ) {
    registerUserStudent(userProfile: $userProfile, userSchool: $userSchool, userStudent: $userStudent, userDevice: $userDevice) {
      username
      token
    }
  }
`;

class FormStudent extends Component<Props, State> {
  state = {
    addOthersOption: true,
    machineSpec: null,
    selectedProvince: 0,
    selectedCity: 0,
  };

  async componentDidMount() {
    const deviceId = await getMachineId();
    const { hostname, platform } = getSystemInformation();
    const machineSpec = { deviceId, hostname, platform };

    this.setState({ machineSpec });
  }

  getFieldMapSchoolInput = () => [
    { key: 'schoolName', type: 'text', placeholder: 'Nama Sekolah', rules: ['required'] },
    {
      key: 'provinces',
      type: 'select',
      placeholder: 'Provinsi',
      query: QUERY_GET_PROVINCE,
      fieldMap: { value: 'id', label: 'name' },
      zIndex: 3,
      rules: ['required'],
      onChange: (selected: Option) => {
        const value = parseInt(selected.value, 10);
        this.setState({ selectedProvince: value });
      },
    },
    {
      key: 'cities',
      type: 'select',
      placeholder: 'Kota',
      query: QUERY_GET_CITY,
      params: { provinceId: this.state.selectedProvince },
      fieldMap: { value: 'id', label: 'name' },
      zIndex: 2,
      rules: ['required'],
      onChange: (selected: Option) => {
        const value = parseInt(selected.value, 10);
        this.setState({ selectedCity: value });
      },
    },
    {
      key: 'districts',
      type: 'select',
      placeholder: 'Kecamatan',
      query: QUERY_GET_DISTRICT,
      params: { cityId: this.state.selectedCity },
      fieldMap: { value: 'id', label: 'name' },
      zIndex: 1,
      rules: ['required'],
    },
  ];

  fieldMapLicenseCode = [
    { key: 'licenseCode', type: 'text', placeholder: 'License Code', rules: ['required'] },
  ];

  fieldMapStudentForm = [
    { key: 'nisnNumber', type: 'number', placeholder: 'Nomor NISN', rules: ['required'] },
    { key: 'nikNumber', type: 'number', placeholder: 'Nomor NIK' },
    // Grade
    {
      key: 'schools',
      type: 'select',
      placeholder: 'Pilih sekolah',
      query: QUERY_GET_SCHOOL,
      fieldMap: { value: 'id', label: 'name' },
      zIndex: 4,
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
          this.setState({ addOthersOption: false, selectedProvince: 0, selectedCity: 0 });
        } else {
          this.setState({ addOthersOption: true });
        }
      },
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
    console.log('data.schools', data.schools);
    const province = data.schools.province || { name: data.provinces.name };
    const city = data.schools.province || { name: data.cities.name };
    const district = data.schools.province || { name: data.districts.name };
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
        province,
        city,
        district,
      },
    };
    const userDevice = {
      ...(this.state.machineSpec || {}),
      licenseCode: data.licenseCode,
    };
    const variables = {
      userProfile,
      userStudent,
      userSchool,
      userDevice,
    };

    console.log('variables', variables);

    mutation({ variables });
  };

  render() {
    const fields = [
      ...this.fieldMapStudentForm,
      ...(!this.state.addOthersOption ? this.getFieldMapSchoolInput() : []),
      ...this.fieldMapLicenseCode,
      ...this.fieldSubmitButton,
    ];

    return (
      <Mutation
        mutation={MUTATION_REGISTRATION_USER_STUDENT}
        update={(cache, { data }) => {
          const result = data.registerUserStudent;
          const token = R.prop('token', result);
          const username = R.propOr('', 'username', result);

          setStore('username', username);
          setStore('token', token).then(() => {
            this.props.history.transitionTo('/main-menu');
          });
        }}>
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
  }
}

export default FormStudent;

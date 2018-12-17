// @flow

import React, { Component } from 'react';
import moment from 'moment';
import get from 'lodash/get';
import { RoleAvatar } from '../common';
import { FormEngine, TextInputProfile } from '../form';
import withProfileFormGroup from './withProfileFormGroup';
import Colors from '../../utils/colors';

type Props = { user: Object };

const studentButton = require('../../images/assets/student-menu.png');
const teacherButton = require('../../images/assets/teacher-menu.png');

type PropsAvatarInputFile = { onPress?: () => void, value?: string, source?: any };
const AvatarInputFile = ({ onPress, value, source }: PropsAvatarInputFile) => (
  <RoleAvatar
    type="square"
    size={150}
    source={source}
    onClick={() => onPress && onPress()}
  />
);

class EditProfileForm extends Component<Props> {
  getFieldMap = () => {
    const {
      fullName,
      isStudent,
      placeBod,
      dateBod,
      phoneNumber,
      email,
      userSchools,
    } = this.props.user;
    const genderName = get(this.props, 'user.gender.name');
    const ttl = `${placeBod}, ${moment(dateBod).format('D MMMM YYYY')}`;
    const schoolName = get(userSchools, '[0].school.name', '');

    return [
      {
        key: 'profilePic',
        type: 'file',
        label: 'Foto Profile',
        ComponentTrigger: <AvatarInputFile source={isStudent ? studentButton : teacherButton} />,
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(element, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'name',
        type: 'caption',
        label: 'Nama',
        defaultValue: fullName,
        disabled: true,
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(<TextInputProfile {...field} />, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'ttl',
        type: 'caption',
        label: 'TTL',
        defaultValue: ttl,
        disabled: true,
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(<TextInputProfile {...field} />, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'gender',
        type: 'caption',
        label: 'Jenis kelamin',
        defaultValue: genderName,
        disabled: true,
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(<TextInputProfile {...field} />, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'school',
        type: 'text',
        label: isStudent ? 'Nama sekolah' : 'Tempat mengajar',
        defaultValue: schoolName,
        disabled: true,
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(<TextInputProfile {...field} />, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'bio',
        type: 'text',
        label: 'Bio',
        placeholder: 'cerita singkat tentang dirimu',
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(<TextInputProfile {...field} />, {
            key: field.key,
            field,
            withRightIcon: true,
          }),
      },
      {
        key: 'divider',
        type: 'caption',
        text: '',
        style: {
          marginTop: 36,
          marginBottom: 5,
          width: '10%',
          borderTopWidth: 5,
          borderTopColor: Colors.yellowBackground,
          borderTopStyle: 'solid',
        },
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(element, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'headline',
        type: 'caption',
        text: 'PENGATURAN PRIVASI',
        style: {
          paddingBottom: 10,
          color: Colors.yellowBackground,
        },
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(element, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'notification',
        type: 'text',
        label: 'Notification',
        disabled: true,
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(<TextInputProfile {...field} />, {
            key: field.key,
            field,
            withRightIcon: true,
          }),
      },
      {
        key: 'phoneNumber',
        type: 'text',
        label: 'Nomor handphone',
        defaultValue: phoneNumber,
        disabled: true,
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(<TextInputProfile {...field} />, {
            key: field.key,
            field,
            withRightIcon: true,
          }),
      },
      {
        key: 'email',
        type: 'text',
        label: 'Alamat email',
        defaultValue: email,
        disabled: true,
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(<TextInputProfile {...field} />, {
            key: field.key,
            field,
            withRightIcon: true,
          }),
      },
      {
        key: 'changePassword',
        type: 'text',
        label: 'Ubah kata sandi',
        disabled: true,
        component: (element: React$Node, field: Object) =>
          withProfileFormGroup(<TextInputProfile {...field} />, {
            key: field.key,
            field,
            withRightIcon: true,
          }),
      },
    ];
  };

  render() {
    return (
      <React.Fragment>
        <FormEngine
          fields={this.getFieldMap()}
        />
      </React.Fragment>
    );
  }
}

export default EditProfileForm;

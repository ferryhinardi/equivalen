// @flow

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Page, WelcomeMessage } from '../common';
import { FormEngine } from '../form';
import Colors from '../../utils/colors';
import { getQueries } from '../../utils/router';

type Props = {};

const styles = {
  title: {
    color: Colors.primary,
    paddingVertical: 8,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
};

const backroundIntro = require('../../images/assets/backround_intro.png');
class RegistrationPage extends Component<Props> {
  getFieldMap = (fields: { phoneNumber: string }) => [
    { key: 'username', type: 'text', placeholder: 'Nama lengkap' },
    { key: 'email', type: 'email', placeholder: 'Email' },
    { key: 'phone', type: 'text', placeholder: 'Nomor handphone', value: fields.phoneNumber, disabled: true },
    { key: 'password', type: 'password', placeholder: 'Kata sandi' },
    {
      key: 'registration',
      type: 'button',
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

  render() {
    const { phoneNumber } = getQueries(this.props);
    console.log('phoneNumber', phoneNumber)

    return (
      <Page backgroundColor={Colors.grey} backgroundImage={backroundIntro}>
        <WelcomeMessage />
        <Text style={styles.title}>FORM PENDAFTARAN</Text>
        <FormEngine fields={this.getFieldMap({ phoneNumber })} />
      </Page>
    );
  }
}

export default RegistrationPage;

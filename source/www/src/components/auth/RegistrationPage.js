import React, {Component} from 'react';
import {Text} from 'react-native';
import {Page, WelcomeMessage} from '../common';
import {FormEngine} from '../form';
import Colors from '../../utils/colors';

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

class RegistrationPage extends Component {
  _fieldMap = [
    {key: 'username', type: 'text', placeholder: 'Nama lengkap'},
    {key: 'email', type: 'email', placeholder: 'Email'},
    {key: 'phone', type: 'number', placeholder: 'Nomor handphone'},
    {key: 'password', type: 'password', placeholder: 'Kata sandi'},
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
    return (
      <Page backgroundColor={Colors.grey} backgroundImage={backroundIntro}>
        <WelcomeMessage />
        <Text style={styles.title}>FORM PENDAFTARAN</Text>
        <FormEngine fields={this._fieldMap} />
      </Page>
    );
  }
}

export default RegistrationPage;

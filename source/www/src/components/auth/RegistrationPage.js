import React, {Component} from 'react';
import {Page} from '../common';
import {FormEngine} from '../form';
import WelcomeMessage from './WelcomeMessage';
import Colors from '../../utils/colors';

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
        color: Colors.white,
        outline: 'none',
        padding: '1rem',
        fontSize: '12pt',
      },
    },
    {
      key: 'login',
      type: 'link',
      text: 'SAYA SUDAH BERGABUNG',
      to: '/login',
      style: {
        textDecoration: 'none',
        fontSize: '9pt',
      },
    },
  ];

  render() {
    return (
      <Page>
        <WelcomeMessage />
        <h3 style={{color: Colors.primary}}>FORM PENDAFTARAN</h3>
        <FormEngine fields={this._fieldMap} />
      </Page>
    );
  }
}

export default RegistrationPage;

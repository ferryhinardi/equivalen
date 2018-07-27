import React, {Component} from 'react';
import {Page} from '../common';
import {FormEngine} from '../form';
import WelcomeMessage from './WelcomeMessage';
import Colors from '../../utils/colors';

class LoginPage extends Component {
  _fieldMap = [
    {key: 'username', type: 'text', placeholder: 'Nama lengkap'},
    {key: 'password', type: 'password', placeholder: 'Kata sandi'},
    {
      key: 'forgotPassword',
      type: 'link',
      text: 'LUPA KATA SANDI',
      to: '/info/?page=forgot-password',
      align: 'left',
      style: {
        textDecoration: 'none',
        fontStyle: 'italic',
        fontSize: '10pt',
        fontWeight: 'bold',
      },
    },
    {
      key: 'login',
      type: 'button',
      text: 'LANJUTKAN MISI',
      style: {
        backgroundColor: Colors.primary,
        color: Colors.white,
        outline: 'none',
        padding: '1rem',
        fontSize: '12pt',
      },
    },
    {
      key: 'registration',
      type: 'link',
      text: 'SAYA INGIN BERGABUNG',
      to: '/registration',
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
        <FormEngine fields={this._fieldMap} />
      </Page>
    );
  }
}

export default LoginPage;

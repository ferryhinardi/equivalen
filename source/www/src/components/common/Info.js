// @flow

import React, {Component} from 'react';
import {Page} from '../common';
import {FormEngine} from '../form';
import Colors from '../../utils/colors';
import {getQueries} from '../../utils/router';

type Props = {
  location: any,
};

class Info extends Component<Props> {
  _fieldMapForgotPassword = [
    {
      key: 'info',
      type: 'caption',
      text: `Silakan masukkan email Anda yang sudah terdaftar di equivalen. Kami akan mengirimkan panduan untuk mengganti kata sandi Anda`,
      style: {
        color: Colors.primary,
        textAlign: 'center',
      },
    },
    {key: 'email', type: 'email', placeholder: 'Email'},
    {
      key: 'forgotPassword',
      type: 'button',
      text: 'KIRIM',
      to: '/info?page=success-forgot-password',
      onClick: () => {
        console.log('event...'); // eslint-disable-line
      },
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
  ];

  _fieldMapSuccessForgotPassword = [
    {
      key: 'info',
      type: 'caption',
      text: `Panduan mengganti kata sandi sudah kami kirimkan ke email Anda. Silakan klik di sini untuk mengirim ulang panduan.`,
      style: {
        color: Colors.primary,
        textAlign: 'center',
      },
    },
    {
      key: 'login',
      type: 'button',
      text: 'KEMBALI',
      to: '/login',
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
  ];

  render() {
    const {page} = getQueries(this.props);
    let fields = [];

    if (page === 'forgot-password') {
      fields = this._fieldMapForgotPassword;
    } else if (page === 'success-forgot-password') {
      fields = this._fieldMapSuccessForgotPassword;
    }

    return (
      <Page>
        <FormEngine
          fields={fields}
        />
      </Page>
    );
  }
}

export default Info;

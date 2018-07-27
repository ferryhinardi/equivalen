// @flow

import React, {Component} from 'react';
import {Route} from 'react-router-dom';
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
      },
    },
    {key: 'email', type: 'email', placeholder: 'Email'},
    {
      key: 'forgotPassword',
      type: 'button',
      text: 'KIRIM',
      style: {
        backgroundColor: Colors.primary,
        color: Colors.white,
        outline: 'none',
        padding: '1rem',
        fontSize: '12pt',
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
      },
    },
    {
      key: 'login',
      type: 'button',
      text: 'KEMBALI',
      to: '/login',
      style: {
        backgroundColor: Colors.primary,
        color: Colors.white,
        outline: 'none',
        padding: '1rem',
        fontSize: '12pt',
      },
    },
  ];

  _handleSubmit = (event, history) => {
    event.preventDefault();
    history.push('/info?page=success-forgot-password');
  };

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
        <Route
          render={({history}) => (
            <FormEngine
              fields={fields}
              onSubmit={(e) => this._handleSubmit(e, history)}
            />
          )}
        />
      </Page>
    );
  }
}

export default Info;

// @flow

import React, {Component} from 'react';
import {Page, WelcomeMessage} from '../common';
import {FormEngine} from '../form';
import Colors from '../../utils/colors';
import type {History} from '../types.shared';

type Props = {
  history: History,
};

const backroundIntro = require('../../images/assets/backround_intro.png');

class LoginPage extends Component<Props> {
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
        textDecorationLine: 'none',
        fontStyle: 'italic',
        fontSize: 14,
        fontWeight: 'bold',
      },
    },
    {
      key: 'login',
      type: 'button',
      text: 'LANJUTKAN MISI',
      onClick: () => {
        this.props.history.replace('/intro');
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
    {
      key: 'registration',
      type: 'link',
      text: 'SAYA INGIN BERGABUNG',
      to: '/registration',
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
        <FormEngine fields={this._fieldMap} />
      </Page>
    );
  }
}

export default LoginPage;

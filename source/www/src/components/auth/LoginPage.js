import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Page} from '../common';
import {FormEngine} from '../form';
import WelcomeMessage from './WelcomeMessage';
import Colors from '../../utils/colors';
// import BackgroundImage from '../../images/assets/BG-intro.png';

class LoginPage extends Component {
  static contextTypes = {
    history: PropTypes.object,
  };

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
        this.context.history.replace('/intro');
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
      <Page backgroundImage={{uri: 'https://www.planwallpaper.com/static/cache/97/38/9738c1b08d52bc90588730685d44adfc.jpg'}}>
        <WelcomeMessage />
        <FormEngine fields={this._fieldMap} />
      </Page>
    );
  }
}

export default LoginPage;

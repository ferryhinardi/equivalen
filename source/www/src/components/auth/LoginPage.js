// @flow

import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import globalAction from '../../actions/global';
import { Page, WelcomeMessage } from '../common';
import { FormEngine } from '../form';
import Colors from '../../utils/colors';
import type { History } from '../types.shared';

type Props = {
  history: History,
  time: number,
  globalActionCreator: Object,
};

const backroundIntro = require('../../images/assets/backround_intro.png');

const mapStateToProps = state => ({
  time: state.global.time,
});

const mapDispatchToProps = dispatch => ({
  globalActionCreator: bindActionCreators(globalAction, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
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
        this.props.globalActionCreator.updateTimeAction(4000);
        this.props.history.replace('/main-menu');
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
      to: '/account-kit',
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
        <Text>{this.props.time}</Text>
        <FormEngine fields={this._fieldMap} />
      </Page>
    );
  }
}

export default LoginPage;

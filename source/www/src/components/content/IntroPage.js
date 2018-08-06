// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import {Page} from '../common';
import RoleAvatar from './RoleAvatar';
import Colors from '../../utils/colors';

type Props = {};

const styles = {
  text: {
    color: Colors.white,
    textAlign: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  footer: {fontSize: 12},
};

class Intro extends Component<Props> {
  static contextTypes = {
    history: PropTypes.object,
  };

  render() {
    return (
      <Page backgroundColor={Colors.primary}>
        <Text style={[styles.text, styles.header]}>SAYA ADALAH SEORANG</Text>
        <RoleAvatar empty role="GURU" position="left" onClick={() => {}} />
        <RoleAvatar role="MURID" position="right" onClick={() => this.context.history.push('/main-menu')} />
        <RoleAvatar role="ORANG TUA" position="left" onClick={() => {}} />
        <Text style={[styles.text, styles.footer]}>SAYA PERLU BANTUAN</Text>
      </Page>
    );
  }
}

export default Intro;

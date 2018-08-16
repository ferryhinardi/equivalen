// @flow

import React, {Component} from 'react';
import {Text} from 'react-native';
import {Page} from '../common';
import RoleAvatar from './RoleAvatar';
import Colors from '../../utils/colors';
import type {History} from '../types.shared';

const teacherButton = require('../../images/assets/teacher_button.png');
const studentButton = require('../../images/assets/student_button.png');
const parentButton = require('../../images/assets/parent_button.png');

type Props = {
  history: History,
};

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
  render() {
    return (
      <Page backgroundColor={Colors.primary}>
        <Text style={[styles.text, styles.header]}>SAYA ADALAH SEORANG</Text>
        <RoleAvatar source={teacherButton} position="left" />
        <RoleAvatar source={studentButton} position="right" onClick={() => this.props.history.push('/main-menu')} />
        <RoleAvatar source={parentButton} position="left" />
        <Text style={[styles.text, styles.footer]}>SAYA PERLU BANTUAN</Text>
      </Page>
    );
  }
}

export default Intro;

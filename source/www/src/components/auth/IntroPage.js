// @flow

import React, { Component } from 'react';
import { Text } from 'react-native';
// import { Mutation } from 'react-apollo';
// import gql from 'graphql-tag';
import { Page } from '../common';
import RoleAvatar from './RoleAvatar';
import Colors from '../../utils/colors';
import type { History } from '../types.shared';
import { getStore } from '../../utils/store';

const teacherButton = require('../../images/assets/teacher_button.png');
const studentButton = require('../../images/assets/student_button.png');
const parentButton = require('../../images/assets/parent_button.png');

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
  footer: { fontSize: 12 },
};

// const mutation = gql``;

class Intro extends Component<Props> {
  onStudentAvatarClick = (history: History) => {
    getStore('userId').then(data => {
      history.transitionTo('/registration', { isSpecificForm: true });
    });
  };

  render() {
    return (
      <Page backgroundColor={Colors.primary}>
        <Text style={[styles.text, styles.header]}>SAYA ADALAH SEORANG</Text>
        <RoleAvatar isEmpty source={teacherButton} position="left" />
        <RoleAvatar source={studentButton} position="right" onClick={this.onStudentAvatarClick} />
        <RoleAvatar isEmpty source={parentButton} position="left" />
        <Text style={[styles.text, styles.footer]}>SAYA PERLU BANTUAN</Text>
      </Page>
    );
  }
}

export default Intro;

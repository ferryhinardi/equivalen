// @flow

import React, {Component} from 'react';
import {Text} from 'react-native';
import {Page} from '../common';
import RoleAvatar from './RoleAvatar';
import Colors from '../../utils/colors';
import images from '../../images/encode_images';
import type {History} from '../types.shared';

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
        <RoleAvatar source={images.teacher_button} position="left" />
        <RoleAvatar source={images.student_button} position="right" onClick={() => this.props.history.push('/main-menu')} />
        <RoleAvatar source={images.parent_button} position="left" />
        <Text style={[styles.text, styles.footer]}>SAYA PERLU BANTUAN</Text>
      </Page>
    );
  }
}

export default Intro;

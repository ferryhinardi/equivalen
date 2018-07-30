// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {Page} from '../common';
import RoleAvatar from './RoleAvatar';
import Colors from '../../utils/colors';

const styles = {
  text: {
    color: Colors.white,
    textAlign: 'center',
  },
  roleContainer: {
    paddingVertical: 28,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  footer: {fontSize: 12},
};

class Intro extends Component {
  static contextTypes = {
    history: PropTypes.object,
  };

  render() {
    return (
      <Page backgroundColor={Colors.primary}>
        <Text style={[styles.text, styles.header]}>SAYA ADALAH SEORANG</Text>
        <View style={styles.roleContainer}>
          <RoleAvatar empty role="GURU" position="left" />
          <RoleAvatar role="MURID" position="right" onClick={() => this.context.history.push('/main-menu')} />
          <RoleAvatar empty role="ORANG TUA" position="left" />
        </View>
        <Text style={[styles.text, styles.footer]}>SAYA PERLU BANTUAN</Text>
      </Page>
    );
  }
}

export default Intro;

// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, RoleAvatar } from '../common';
import Colors from '../../utils/colors';

type Props = { isStudent?: boolean, isTeacher?: boolean };
type State = {};

const studentButton = require('../../images/assets/student-menu.png');
const teacherButton = require('../../images/assets/teacher-menu.png');
const styles = {
  headerView: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    width: '100%',
  },
  headerText: {
    fontSize: 32,
    letterSpacing: 4,
    flex: 1,
    alignSelf: 'center',
  },
};

class HeaderMenu extends Component<Props, State> {
  render() {
    let color = null;
    let borderBottomColor = null;
    let source = null;

    if (this.props.isStudent) {
      color = Colors.primary;
      source = studentButton;
    }
    if (this.props.isTeacher) {
      color = Colors.redS;
      source = teacherButton;
    }

    return (
      <View style={[styles.headerView, { borderBottomColor }]}>
        <Text style={[styles.headerText, { color }]}>EQUIVALEN</Text>
        <RoleAvatar type="square" size={80} source={source} />
      </View>
    );
  }
}

export default HeaderMenu;

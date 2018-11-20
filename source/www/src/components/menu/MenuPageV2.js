// @flow

import React, { Component } from 'react';
import { Page } from '../common';
import HeaderMenu from './HeaderMenu';
import StudentMenu from './StudentMenu';
import TeacherMenu from './TeacherMenu';
import FooterMenu from './FooterMenu';
import Colors from '../../utils/colors';

type Props = {};
type State = {};

class MenuPageV2 extends Component<Props, State> {
  render() {
    const isStudent = true;
    const isTeacher = false;
    let backgroundColor = null;

    if (isStudent) {
      backgroundColor = Colors.yellowBackground;
    }
    if (isTeacher) {
      backgroundColor = Colors.grey;
    }

    return (
      <Page
        backgroundColor={backgroundColor}
        isFullWidth
        justifyContent="flex-start">
        <HeaderMenu isTeacher={isTeacher} isStudent={isStudent} />
        {isStudent ? <StudentMenu /> : <TeacherMenu />}
        <FooterMenu isTeacher={isTeacher} isStudent={isStudent} />
      </Page>
    );
  }
}

export default MenuPageV2;

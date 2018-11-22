// @flow

import React, { Component } from 'react';
import HeaderMenu from './HeaderMenu';
import StudentMenu from './StudentMenu';
import TeacherMenu from './TeacherMenu';
import FooterMenu from './FooterMenu';
import type { StringBoolean } from '../types.shared';

type Props = { isStudent: StringBoolean, isTeacher: StringBoolean };
type State = {};

class MenuListView extends Component<Props, State> {
  render() {
    const { isStudent, isTeacher } = this.props;
    let Content = null;

    if (isStudent === 'true') {
      Content = <StudentMenu />;
    } else if (isTeacher === 'true') {
      Content = <TeacherMenu />;
    }

    return (
      <React.Fragment>
        <HeaderMenu isTeacher={isTeacher} isStudent={isStudent} />
        {Content}
        <FooterMenu isTeacher={isTeacher} isStudent={isStudent} />
      </React.Fragment>
    );
  }
}

export default MenuListView;

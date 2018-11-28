// @flow

import React, { Component } from 'react';
import HeaderMenu from './HeaderMenu';
import StudentMenu from './StudentMenu';
import TeacherMenu from './TeacherMenu';
import FooterMenu from './FooterMenu';
import { Loading } from '../common';

type Props = {
  isStudent: boolean,
  isTeacher: boolean,
  props: Object,
  loading: boolean,
};
type State = {};

class MenuListView extends Component<Props, State> {
  render() {
    const { isStudent, isTeacher, loading, props } = this.props;
    let Content = null;

    if (isStudent) {
      Content = <StudentMenu />;
    } else if (isTeacher) {
      Content = <TeacherMenu />;
    }

    return (
      <React.Fragment>
        <HeaderMenu isTeacher={isTeacher} isStudent={isStudent} />
        {loading ? <Loading /> : Content}
        <FooterMenu
          isTeacher={isTeacher}
          isStudent={isStudent}
          props={props}
        />
      </React.Fragment>
    );
  }
}

export default MenuListView;

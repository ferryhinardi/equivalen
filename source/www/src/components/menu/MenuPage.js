// @flow

import React, { Component } from 'react';
import { Page } from '../common';
import MenuListView from './MenuListView';
import HamburgerMenu from './HamburgerMenu';
import { getQueries } from '../../utils/router';
import Colors from '../../utils/colors';

type Props = {};
type State = {};

class MenuPage extends Component<Props, State> {
  render() {
    const { isStudent, isTeacher } = getQueries(this.props);
    let backgroundColor = null;

    if (isStudent === 'true') {
      backgroundColor = Colors.yellowBackground;
    } else if (isTeacher === 'true') {
      backgroundColor = Colors.grey;
    }

    return (
      <Page
        backgroundColor={backgroundColor}
        isFullWidth
        justifyContent="flex-start">
        <MenuListView isStudent={isStudent} isTeacher={isTeacher} />
      </Page>
    );
  }
}

export default MenuPage;

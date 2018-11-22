// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { RouterContextConsumer } from '../context/router.context';
import MenuView from './MenuView';

type Props = {
  HeaderComponent?: React$Node,
  FooterComponent?: React$Node,
};
type State = {};
const menus = ['video-tutorial', 'bank-soal', 'jadwal-pintar', 'artikel', 'ide-baru'];

class TeacherMenu extends Component<Props, State> {
  render() {
    return (
      <FlatList
        data={menus}
        keyExtractor={(item, index) => item}
        style={{ width: '100%' }}
        contentContainerStyle={{ paddingVertical: 2 }}
        ListHeaderComponent={this.props.HeaderComponent}
        ListFooterComponent={this.props.FooterComponent}
        renderItem={({ item }) => (
          <RouterContextConsumer>
            {({ history }) => (
              <MenuView
                source={require(`../../images/assets/teacher-${item}.png`)}
                widthContainer="100%"
                onClick={() => history.transitionTo('/profile')}
              />
            )}
          </RouterContextConsumer>
        )}
      />
    );
  }
}

export default TeacherMenu;

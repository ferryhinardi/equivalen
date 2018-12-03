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
const menus = [
  { type: 'belajar', url: '' },
  { type: 'tugas', url: '' },
  { type: 'ulangan', url: '' },
  { type: 'tryout', url: '' },
  // { type: 'artikel', url: '' },
  // { type: 'lainnya', url: '' },
];

class StudentMenu extends Component<Props, State> {
  render() {
    return (
      <FlatList
        data={menus}
        numColumns={2}
        keyExtractor={(item, index) => item}
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}
        ListHeaderComponent={this.props.HeaderComponent}
        ListFooterComponent={this.props.FooterComponent}
        renderItem={({ item }) => (
          <RouterContextConsumer>
            {({ history }) => (
              <MenuView
                source={require(`../../images/assets/student-${item.type}.png`)}
                widthContainer="50%"
                onClick={() => history.transitionTo('/profile')}
              />
            )}
          </RouterContextConsumer>
        )}
      />
    );
  }
}

export default StudentMenu;

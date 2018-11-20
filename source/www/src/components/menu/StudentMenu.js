// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import MenuViewV2 from './MenuViewV2';

type Props = {};
type State = {};
const menus = ['belajar', 'tugas', 'ulangan', 'tryout', 'artikel', 'lainnya'];

class StudentMenu extends Component<Props, State> {
  render() {
    return (
      <FlatList
        data={menus}
        numColumns={2}
        keyExtractor={(item, index) => item}
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}
        renderItem={({ item }) => (
          <MenuViewV2
            source={require(`../../images/assets/student-${item}.png`)}
            widthContainer="50%"
            onClick={() => {}}
          />
        )}
      />
    );
  }
}

export default StudentMenu;

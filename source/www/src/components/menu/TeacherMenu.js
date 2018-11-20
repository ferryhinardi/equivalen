// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import MenuViewV2 from './MenuViewV2';

type Props = {};
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
        renderItem={({ item }) => (
          <MenuViewV2
            source={require(`../../images/assets/teacher-${item}.png`)}
            widthContainer="100%"
            onClick={() => {}}
          />
        )}
      />
    );
  }
}

export default TeacherMenu;

// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { Image } from '../common';
import { ButtonHoverContextProvider } from '../context/buttonhover.context';
import Colors from '../../utils/colors';
import type { StringBoolean } from '../types.shared';

type Props = { isStudent?: StringBoolean, isTeacher?: StringBoolean };
type State = { activeMenu: string };

const styles = {
  footerView: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: Colors.primary,
    width: '100%',
  },
  buttonMenu: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
};
const menus = ['home', 'arsip', 'lainnya'];

class FooterMenu extends Component<Props, State> {
  state = {
    activeMenu: 'home',
  };

  onMenuPress = (activeMenu: string) => {
    this.setState({ activeMenu });
  };

  render() {
    const { isStudent, isTeacher } = this.props;
    let prefix = 's';

    if (isStudent === 'true') {
      prefix = 's';
    } else if (isTeacher === 'true') {
      prefix = 't';
    }

    return (
      <View style={styles.footerView}>
        {menus.map(menu => {
          const isActive = menu === this.state.activeMenu;
          const source = isActive
            ? require(`../../images/assets/footer-menu-${menu}-${prefix}-active.png`)
            : require(`../../images/assets/footer-menu-${menu}-${prefix}.png`);

          return (
            <ButtonHoverContextProvider
              key={menu}
              focusStyle={{}}
              style={styles.buttonMenu}
              onPress={() => this.onMenuPress(menu)}>
              <Image source={source} size={50} />
            </ButtonHoverContextProvider>
          );
        })}
      </View>
    );
  }
}

export default FooterMenu;

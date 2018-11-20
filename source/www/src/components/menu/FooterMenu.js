// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { Image } from '../common';
import {
  ButtonHoverContextProvider,
  ButtonHoverContextConsumer,
} from '../context/buttonhover.context';
import Colors from '../../utils/colors';

type Props = { isStudent?: boolean, isTeacher?: boolean };
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
    activeMenu: '',
  };

  onMenuPress = (activeMenu: string) => {
    this.setState({ activeMenu });
  };

  render() {
    let prefix = null;

    if (this.props.isStudent) {
      prefix = 's';
    }
    if (this.props.isTeacher) {
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

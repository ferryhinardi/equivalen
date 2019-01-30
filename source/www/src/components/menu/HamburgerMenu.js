// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { RouterContextConsumer } from '../context/router.context';
import {
  ButtonHoverContextProvider,
  ButtonHoverContextConsumer,
} from '../context/buttonhover.context';
import MenuButton from './MenuButton';
import Colors from '../../utils/colors';
import type { History } from '../types.shared';

type Props = {};
type State = {
  active: boolean,
};

const styles = {
  wrapperMenuHamburger: { justifyContent: 'center', paddingHorizontal: 8 },
  menuHamburger: { borderWidth: 2, borderColor: Colors.white, padding: 12 },
  backgroundMenu: { borderWidth: 2, borderColor: Colors.mainBackground, backgroundColor: Colors.white },
  tooltip: { position: 'absolute', top: 80, right: 0, padding: 16, width: 240 },
  additionalTooltip: {
    position: 'absolute',
    top: -20,
    right: 0,
    bottom: '100%',
    backgroundColor: Colors.mainBackground,
    borderBottomWidth: 20,
    borderBottomColor: Colors.white,
    borderLeftWidth: 24,
    borderLeftColor: Colors.transparent,
    borderRightWidth: 24,
    borderRightColor: Colors.transparent,
  },
  containerMenu: { position: 'relative' },
};

class HamburgerMenu extends Component<Props, State> {
  state = {
    active: false,
  };

  onMenuClick = () => {
    this.setState({ active: !this.state.active });
  };

  goMainMenu = (history: History) => {
    history.replace('/main-menu');
  };

  renderTooltip = () => (
    <View style={[styles.backgroundMenu, styles.tooltip]}>
      <View style={styles.additionalTooltip} />
      <View style={styles.containerMenu}>
        <RouterContextConsumer>
          {({ history }) => (
            <MenuButton
              text="Keluar"
              header
              right
              onClick={() => {
                this.goMainMenu(history);
              }}
            />
          )}
        </RouterContextConsumer>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.wrapperMenuHamburger}>
        <ButtonHoverContextProvider
          focusStyle={{}}
          onPress={() => this.onMenuClick()}>
          <ButtonHoverContextConsumer>
            {({focused}) => {
              const style = Object.assign(
                {},
                styles.menuHamburger,
                focused ? styles.backgroundMenu : null,
              );
              const iconFocusColor = focused ? Colors.mainBackground : Colors.white;

              return (
                <View style={style}>
                  <FontAwesomeIcon icon={faBars} color={iconFocusColor} />
                </View>
              );
            }}
          </ButtonHoverContextConsumer>
        </ButtonHoverContextProvider>
        {this.state.active ? this.renderTooltip() : null}
      </View>
    );
  }
}

export default HamburgerMenu;

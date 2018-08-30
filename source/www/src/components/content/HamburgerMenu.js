// @flow

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {Divider} from '../common';
import {ButtonHoverContextProvider, ButtonHoverContextConsumer} from '../context/buttonhover.context';
import Colors from '../../utils/colors';
import {RouterContextConsumer} from '../context/router.context';

type Props = {};
type State = {hoverMenuIndex: number, active: boolean};

const styles = {
  wrapperMenuHamburger: {justifyContent: 'center', paddingHorizontal: 8},
  menuHamburger: {borderWidth: 2, borderColor: Colors.white, padding: 12},
  backgroundMenu: {borderWidth: 2, borderColor: Colors.mainBackground, backgroundColor: Colors.white},
  tooltip: {position: 'absolute', top: 80, right: 0, padding: 16, width: 230},
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
  containerMenu: {position: 'relative'},
  wrapperMenu: {padding: 8},
  menuText: {fontSize: 20, fontWeight: 'bold', textAlign: 'right'},
};

class HamburgerMenu extends Component<Props, State> {
  state = {
    active: false,
    hoverMenuIndex: -1,
  };

  onMenuClick = () => {
    this.setState({active: !this.state.active});
  };

  renderOptionMenu = (index: number, labelMenu: string, action: () => void) => (
    <ButtonHoverContextProvider
      style={styles.wrapperMenu}
      focusStyle={{}}
      params={{hoverMenuIndex: index}}
      onPress={() => action()}>
      <ButtonHoverContextConsumer>
        {({focused, hoverMenuIndex}) => {
          const styleFocusMenu = hoverMenuIndex === index && focused ? {
            ...styles.menuText,
            color: Colors.mainBackground,
          } : {
            ...styles.menuText,
          };

          return (
            <Text style={styleFocusMenu}>{labelMenu}</Text>
          );
        }}
      </ButtonHoverContextConsumer>
    </ButtonHoverContextProvider>
  );

  renderTooltip = () => (
    <View style={[styles.backgroundMenu, styles.tooltip]}>
      <View style={styles.additionalTooltip} />
      <View style={styles.containerMenu}>
        {this.renderOptionMenu(1, 'Tryout', () => {})}
        <Divider />
        {this.renderOptionMenu(2, 'Mata Pelajaran', () => {})}
        <Divider />
        <RouterContextConsumer>
          {({history}) => (
            this.renderOptionMenu(3, 'Keluar', () => history.replace('login'))
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

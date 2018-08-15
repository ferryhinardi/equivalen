// @flow

import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {Divider} from '../common';
import Colors from '../../utils/colors';

type Props = {};
type State = {hover: boolean, hoverMenuIndex: number, active: boolean};

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
  wrapperMenu: {padding: 8, textAlign: 'right'},
  menuText: {fontSize: 20, fontWeight: 'bold'},
};

class HamburgerMenu extends Component<Props, State> {
  state = {
    hover: false,
    active: false,
    hoverMenuIndex: -1,
  };

  onMenuClick = () => {
    this.setState({active: !this.state.active});
  };

  renderOptionMenu = (index: number, labelMenu: string) => {
    const styleFocusMenu = this.state.hoverMenuIndex === index ? {
      ...styles.menuText,
      color: Colors.mainBackground,
    } : {
      ...styles.menuText,
    };
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.wrapperMenu}
        onMouseEnter={() => this.setState({hoverMenuIndex: index})}
        onMouseLeave={() => this.setState({hoverMenuIndex: -1})}
        onPress={() => alert('menu')}>
        <Text style={styleFocusMenu}>{labelMenu}</Text>
      </TouchableOpacity>
    );
  };

  renderTooltip = () => {
    return (
      <View style={[styles.backgroundMenu, styles.tooltip]}>
        <View style={styles.additionalTooltip} />
        <View style={styles.containerMenu}>
          {this.renderOptionMenu(1, 'Tryout')}
          <Divider />
          {this.renderOptionMenu(2, 'Mata Pelajaran')}
          <Divider />
          {this.renderOptionMenu(3, 'Keluar')}
        </View>
      </View>
    );
  };

  render() {
    const style = Object.assign(
      {},
      styles.menuHamburger,
      this.state.hover ? styles.backgroundMenu : null,
    );
    const iconFocusColor = this.state.hover ? Colors.mainBackground : Colors.white;

    return (
      <View style={styles.wrapperMenuHamburger}>
        <TouchableOpacity
          activeOpacity={1}
          onMouseEnter={() => this.setState({hover: true})}
          onMouseLeave={() => this.setState({hover: false})}
          onPress={() => this.onMenuClick()}>
          <View style={style}>
            <FontAwesomeIcon icon={faBars} color={iconFocusColor} />
          </View>
        </TouchableOpacity>
        {this.state.active ? this.renderTooltip() : null}
      </View>
    );
  }
}

export default HamburgerMenu;

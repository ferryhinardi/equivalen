// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AccordionMenu from './AccordionMenu';
import MenuButton from './MenuButton';
import { Divider } from '../common';
import { ButtonHoverContextProvider, ButtonHoverContextConsumer } from '../context/buttonhover.context';
import { setStore } from '../../utils/store';
import Colors from '../../utils/colors';
import { RouterContextConsumer } from '../context/router.context';
import type {History} from '../types.shared';

type Props = { tryouts: Array<string> };
type State = { hoverMenuIndex: number, active: boolean };

const styles = {
  wrapperMenuHamburger: {justifyContent: 'center', paddingHorizontal: 8},
  menuHamburger: {borderWidth: 2, borderColor: Colors.white, padding: 12},
  backgroundMenu: {borderWidth: 2, borderColor: Colors.mainBackground, backgroundColor: Colors.white},
  tooltip: {position: 'absolute', top: 80, right: 0, padding: 16, width: 250},
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
  wrapperButtonMenuTo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    paddingVertical: 8,
  },
  wrapperButtonMenuMatpel: { paddingVertical: 8 },
};

class HamburgerMenu extends Component<Props, State> {
  state = {
    active: false,
    hoverMenuIndex: -1,
  };

  onMenuClick = () => {
    this.setState({ active: !this.state.active });
  };

  handleCourseClick = () => {

  };

  handleTryoutClick = async (index: number, history: History) => {
    const toId = index + 1;

    await setStore('to', toId);
    await setStore('answer', {});

    history.push('/main');
  };

  renderTooltip = () => (
    <View style={[styles.backgroundMenu, styles.tooltip]}>
      <View style={styles.additionalTooltip} />
      <RouterContextConsumer>
        {({ history }) => (
          <View style={styles.containerMenu}>
            <AccordionMenu text="Tryout">
              <View style={styles.wrapperButtonMenuTo}>
                {this.props.tryouts.map((tryout, idx) => (
                  <View key={tryout} style={{width: 'calc(100% * (1/3))'}}>
                    <MenuButton text={(idx + 1).toString()} onClick={() => this.handleTryoutClick(idx, history)} />
                  </View>
                ))}
              </View>
            </AccordionMenu>
            <Divider />
            <AccordionMenu text="Mata Pelajaran">
              <View style={styles.wrapperButtonMenuMatpel}>
                <MenuButton text="BAHASA INDONESIA" right onClick={this.handleCourseClick} />
                <MenuButton text="BAHASA INGGRIS" right onClick={this.handleCourseClick} />
                <MenuButton text="MATEMATIKA" right onClick={this.handleCourseClick} />
                <MenuButton text="IPA" right onClick={this.handleCourseClick} />
              </View>
            </AccordionMenu>
            <Divider />
            <MenuButton text="Keluar" onClick={() => history.replace('login')} header right />
          </View>
        )}
      </RouterContextConsumer>
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

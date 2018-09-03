// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import globalAction from '../../actions/global';
import mainAction from '../../actions/main';
import { withModalTryout } from '../modal';
import { Divider } from '../common';
import { RouterContextConsumer } from '../context/router.context';
import {
  ButtonHoverContextProvider,
  ButtonHoverContextConsumer,
} from '../context/buttonhover.context';
import AccordionMenu from './AccordionMenu';
import MenuButton from './MenuButton';
import Colors from '../../utils/colors';
import type { MatPel } from '../types.shared';

type Props = {
  tryouts?: Array<string>,
  globalActionCreator?: Object,
  mainActionCreator?: Object,
  renderModal?: (matpel: ?MatPel) => void,
};
type State = {
  active: boolean,
  matpel: ?MatPel,
};

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

const mapDispatchToProps = dispatch => ({
  globalActionCreator: bindActionCreators(globalAction, dispatch),
  mainActionCreator: bindActionCreators(mainAction, dispatch),
});

@withModalTryout
@connect(null, mapDispatchToProps)
class HamburgerMenu extends Component<Props, State> {
  state = {
    active: false,
    matpel: null,
  };

  onMenuClick = () => {
    this.setState({ active: !this.state.active });
  };

  handleCourseClick = (matpel: MatPel) => {
    this.props.globalActionCreator &&
      this.props.globalActionCreator.visibleModalTryoutAction(true)

    this.setState({ active: false, matpel });
  };

  handleTryoutClick = (index: number) => {
    const toId = index + 1;

    if (this.props.mainActionCreator) {
      this.props.mainActionCreator.resetTimeAction();
      this.props.mainActionCreator.setTryoutAction(toId);
      this.props.mainActionCreator.setAnswerAction({});
    }

    this.setState({ active: false });
  };

  renderTooltip = () => (
    <View style={[styles.backgroundMenu, styles.tooltip]}>
      <View style={styles.additionalTooltip} />
      <View style={styles.containerMenu}>
        <AccordionMenu text="Tryout">
          <View style={styles.wrapperButtonMenuTo}>
            {(this.props.tryouts || []).map((tryout, idx) => (
              <View key={tryout} style={{width: 'calc(100% * (1/3))'}}>
                <MenuButton text={(idx + 1).toString()} onClick={() => this.handleTryoutClick(idx)} />
              </View>
            ))}
          </View>
        </AccordionMenu>
        <Divider />
        <AccordionMenu text="Mata Pelajaran">
          <View style={styles.wrapperButtonMenuMatpel}>
            <MenuButton text="BAHASA INDONESIA" right onClick={() => this.handleCourseClick('bhsindo')} />
            <MenuButton text="BAHASA INGGRIS" right onClick={() => this.handleCourseClick('bhsing')} />
            <MenuButton text="MATEMATIKA" right onClick={() => this.handleCourseClick('mat')} />
            <MenuButton text="IPA" right onClick={() => this.handleCourseClick('ipa')} />
          </View>
        </AccordionMenu>
        <Divider />
        <RouterContextConsumer>
          {({ history }) => (
            <MenuButton text="Keluar" onClick={() => history.replace('login')} header right />
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
        {this.props.renderModal && this.props.renderModal(this.state.matpel)}
      </View>
    );
  }
}

export default HamburgerMenu;

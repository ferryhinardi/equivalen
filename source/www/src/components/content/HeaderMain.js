// @flow

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import mainAction from '../../actions/main';
import { withModal, ModalResult } from '../modal';
import Timer from './Timer';
import { HamburgerMenu } from '../menu';
import { Divider } from '../common';
import Colors from '../../utils/colors';
import type { MatPel } from '../types.shared';

type Props = {
  matpel: MatPel,
  showTimer: boolean,
  tryouts: Array<string>,
  renderModal?: (Props: *) => void,
  mainActionCreator?: Object,
  startTime?: boolean,
};
type State = {};

const imgLogoEx = require('../../images/assets/img_logo_ex.png');

const styles = {
  header: {flexDirection: 'row', padding: 15},
  containerLeftHeader: {paddingVertical: 5, paddingHorizontal: 10},
  logoImage: {width: 170, height: 50},
  wrapperLogoMatpel: {paddingVertical: 5, paddingHorizontal: 10},
  logoMatpel: {width: 60, height: 60},
  containerRightHeader: {flexDirection: 'row', flex: 1, justifyContent: 'space-between'},
  wrapperUsername: {justifyContent: 'center', marginLeft: 'auto', paddingHorizontal: 8},
  username: {color: Colors.white, fontSize: 24},
};

const mapStateToProps = state => ({
  startTime: state.main.startTime,
});

const mapDispatchToProps = dispatch => ({
  mainActionCreator: bindActionCreators(mainAction, dispatch),
});

@withModal(ModalResult)
@connect(mapStateToProps, mapDispatchToProps)
class HeaderMain extends Component<Props, State> {
  _onTimeOut = () => {
    this.props.mainActionCreator &&
      this.props.mainActionCreator.toogleStartTimeAction(false);
  };

  _onStartResumeTimer = () => {
    this.props.mainActionCreator &&
      this.props.mainActionCreator.toogleStartTimeAction(true);
  };

  render() {
    const isOpen = this.props.startTime === false;

    return (
      <View style={styles.header}>
        <View style={styles.containerLeftHeader}>
          <Image source={imgLogoEx} style={styles.logoImage} size={30} />
        </View>
        <Divider vertical />
        <View style={styles.containerRightHeader}>
          <View style={styles.wrapperLogoMatpel}>
            <Image
              source={require(`../../images/assets/img_icon_${this.props.matpel}.png`)}
              style={styles.logoMatpel}
            />
          </View>
          {this.props.showTimer && <Timer onTimeOut={this._onTimeOut} />}
          <View style={styles.wrapperUsername}>
            <Text style={styles.username}>Username</Text>
          </View>
          <HamburgerMenu tryouts={this.props.tryouts} />
        </View>
        {this.props.renderModal &&
          this.props.renderModal({
            isOpen,
            close: this._onStartResumeTimer,
          })}
      </View>
    );
  }
}

export default HeaderMain;

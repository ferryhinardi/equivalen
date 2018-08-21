// @flow

import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import Timer from './Timer';
import HamburgerMenu from './HamburgerMenu';
import ModalResult from './ModalResult';
import Divider from '../common/Divider'
import Colors from '../../utils/colors';
import type {MatPel} from '../types.shared';

type Props = {matpel: MatPel, showTimer: boolean};
type State = {isTimeOut: boolean};

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

class HeaderMain extends Component<Props, State> {
  state = {
    isTimeOut: false,
  };

  _onTimeOut = () => this.setState({isTimeOut: true});

  _onResetTimer = () => this.setState({isTimeOut: false});

  render() {
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
          {this.props.showTimer && <Timer onTimeOut={this._onTimeOut} startTime={!this.state.isTimeOut} />}
          <View style={styles.wrapperUsername}>
            <Text style={styles.username}>Username</Text>
          </View>
          <HamburgerMenu />
        </View>
        {this.state.isTimeOut && <ModalResult resetTimer={this._onResetTimer} />}
      </View>
    );
  }
}

export default HeaderMain;

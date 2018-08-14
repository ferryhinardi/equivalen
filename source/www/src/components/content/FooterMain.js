// @flow

import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import type {History} from '../types.shared';

type Props = {
  history: History,
};

const styles = {
  container: {flexDirection: 'row', justifyContent: 'center', paddingVertical: 8},
  wrapperIcon: {paddingHorizontal: 8},
  icon: {width: 30, height: 30},
};
const leftNav = require('../../images/assets_encode/img_btn_navleft.png');
const rightNav = require('../../images/assets_encode/img_btn_navright.png');

class FooterMain extends Component<Props> {
  goToPage = (page: number) => {
    this.props.history.transitionTo('/main', {
      page,
    });
  };

  onLeftNavigation = () => {
    const currentPage = parseInt(this.props.history.getCurrentState().page || 1, 10);
    if (currentPage > 1) {
      this.goToPage(currentPage - 1);
    }
  };
  onRightNavigation = () => {
    const currentPage = parseInt(this.props.history.getCurrentState().page || 1, 10);
    this.goToPage(currentPage + 1);
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.wrapperIcon} onPress={this.onLeftNavigation}>
          <Image source={leftNav} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapperIcon} onPress={this.onRightNavigation}>
          <Image source={rightNav} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default FooterMain;

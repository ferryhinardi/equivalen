// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

type Props = {
  onNextNumber: () => void,
  onPrevNumber: () => void,
  onSetDoubtAnswer: () => void,
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    width: '100%',
  },
  wrapperIcon: { paddingHorizontal: 8 },
  icon: { width: 30, height: 30 },
};
const leftNav = require('../../images/assets/img_btn_navleft.png');
const doubtButton = require('../../images/assets/img_btn_navmid.png');
const rightNav = require('../../images/assets/img_btn_navright.png');

class FooterBoard extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.wrapperIcon} onPress={this.props.onPrevNumber}>
          <Image source={leftNav} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapperIcon} onPress={this.props.onSetDoubtAnswer}>
          <Image source={doubtButton} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapperIcon} onPress={this.props.onNextNumber}>
          <Image source={rightNav} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default FooterBoard;

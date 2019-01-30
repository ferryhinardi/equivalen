// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { Image, Divider } from '../common';
import Timer from '../content/Timer';
import { HamburgerMenu } from '../menu';

type Props = {
  logo: string,
  onTimeoutTimer?: () => void,
};

const imgLogoEx = require('../../images/assets/img_logo_ex.png');

const styles = {
  container: { flexDirection: 'row', padding: 15, width: '100%' },
  containerLeftHeader: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  containerRightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoMatpel: { paddingHorizontal: 10 },
};

class HeaderBoard extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerLeftHeader}>
          <Image source={imgLogoEx} size={10} />
          <Divider vertical />
          <Image
            source={this.props.logo}
            size={25}
            style={styles.logoMatpel}
          />
          <Timer onTimeOut={this.props.onTimeoutTimer} />
        </View>
        <View style={styles.containerRightHeader}>
          <HamburgerMenu />
        </View>
      </View>
    );
  }
}

export default HeaderBoard;

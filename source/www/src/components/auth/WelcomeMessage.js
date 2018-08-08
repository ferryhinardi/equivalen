// @flow

import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';
import logo from '../../images/logo/logo-welcome.png';
import Colors from '../../utils/colors';

type Props = {};

const styles = {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {color: Colors.primary},
  image: {width: '100%', height: '50px'},
};

class WelcomeMessage extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Selamat datang di</Text>
        <Image source={logo} style={styles.image} />
        <Text style={styles.text}>
          Kami senang kami tidak sendiri mewujudkan mimpi.
        </Text>
      </View>
    );
  }
}

export default WelcomeMessage;

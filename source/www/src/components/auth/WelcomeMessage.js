// @flow

import React from 'react';
import {View, Image, Text} from 'react-native';
import Colors from '../../utils/colors';

const logo = require('../../images/logo/logo-welcome.png');
const styles = {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {color: Colors.primary},
  image: {width: '100%', height: '50px'},
};

const WelcomeMessage = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Selamat datang di</Text>
    <Image source={logo} style={styles.image} />
    <Text style={styles.text}>
      Kami senang kami tidak sendiri mewujudkan mimpi.
    </Text>
  </View>
);

export default WelcomeMessage;

import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
// import Image from '../common/AutoSizeImage';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import Timer from './Timer';
import Colors from '../../utils/colors';

const logo = require('../../images/assets_encode/img_logo_ex.png');
const logoMat = require('../../images/assets_encode/img_icon_bhsindo.png');

const styles = {
  header: {flexDirection: 'row', padding: 15},
  containerLeftHeader: {paddingVertical: 5, paddingHorizontal: 10},
  logoImage: {width: 170, height: 50},
  wrapperLogoMatpel: {paddingVertical: 5, paddingHorizontal: 10},
  logoMatpel: {width: 60, height: 60},
  divider: {borderRightWidth: 3, borderRightColor: Colors.white},
  containerRightHeader: {flexDirection: 'row', flex: 1, justifyContent: 'space-between'},
  wrapperUsername: {justifyContent: 'center', marginLeft: 'auto', paddingHorizontal: 8},
  username: {color: Colors.white, fontSize: 24},
  wrapperMenu: {justifyContent: 'center', paddingHorizontal: 8},
  menu: {borderWidth: 2, borderColor: Colors.white, padding: 8},
};

class HeaderMain extends Component {
  render() {
    return (
      <View style={styles.header}>
        <View style={styles.containerLeftHeader}>
          <Image source={logo} style={styles.logoImage} size={30} />
        </View>
        <View style={styles.divider} />
        <View style={styles.containerRightHeader}>
          <View style={styles.wrapperLogoMatpel}>
            <Image source={logoMat} style={styles.logoMatpel} />
          </View>
          <Timer />
          <View style={styles.wrapperUsername}>
            <Text style={styles.username}>Username</Text>
          </View>
          <TouchableOpacity activeOpacity={0.9} style={styles.wrapperMenu}>
            <View style={styles.menu}>
              <FontAwesomeIcon icon={faBars} color={Colors.white} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default HeaderMain;

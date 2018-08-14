import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import Colors from '../../utils/colors';

const styles = {
  wrapperMenu: {justifyContent: 'center', paddingHorizontal: 8},
  menu: {borderWidth: 2, borderColor: Colors.white, padding: 12},
};

class HamburgerMenu extends Component {
  render() {
    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.wrapperMenu}>
        <View style={styles.menu}>
          <FontAwesomeIcon icon={faBars} color={Colors.white} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default HamburgerMenu;

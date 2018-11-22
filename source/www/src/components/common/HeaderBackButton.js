// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { RouterContextConsumer } from '../context/router.context';
import { Text } from '../common';
import Colors from '../../utils/colors';
import type { History } from '../types.shared';

type Props = {
  rightMenuText: string,
  onRightMenuClick: (history: History) => void,
};

const styles = {
  container: { flexDirection: 'row', width: '100%' },
  wrapperLeftMenu: { flex: 1 },
  wrapperRightMenu: { justifyContent: 'center' },
  rightMenuText: { fontSize: 16 },
};

class HeaderBackButton extends Component<Props> {
  render() {
    const { rightMenuText, onRightMenuClick } = this.props;
    return (
      <View style={styles.container}>
        <RouterContextConsumer>
          {({ history }: { history: History }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.wrapperLeftMenu}
              onPress={() => history.goBack()}>
              <FontAwesomeIcon icon={faAngleLeft} color={Colors.primary} size="3x"  />
            </TouchableOpacity>
          )}
        </RouterContextConsumer>
        <RouterContextConsumer>
          {({ history }: { history: History }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.wrapperRightMenu}
              onPress={() => onRightMenuClick(history)}>
              <Text style={styles.rightMenuText}>{rightMenuText}</Text>
            </TouchableOpacity>
          )}
        </RouterContextConsumer>
      </View>
    );
  }
}

export default HeaderBackButton;

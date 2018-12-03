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
  title?: string,
  onRightMenuClick: (history: History) => void,
  ComponentBackButton?: React$Node,
  ComponentMid?: React$Node,
  ComponentRightButton?: React$Node,
};

const styles = {
  container: { flexDirection: 'row', width: '100%' },
  wrapperLeftMenu: {},
  wrapperCenterMenu: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  wrapperRightMenu: { justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
};

class HeaderBackButton extends Component<Props> {
  render() {
    const {
      title,
      ComponentBackButton,
      ComponentMid,
      ComponentRightButton,
      onRightMenuClick,
    } = this.props;

    return (
      <View style={styles.container}>
        {ComponentBackButton ? ComponentBackButton : (
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
        )}
        <View style={styles.wrapperCenterMenu}>
          {ComponentMid}
          {title ? <Text style={styles.title}>{title}</Text> : <View />}
        </View>
        <RouterContextConsumer>
          {({ history }: { history: History }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.wrapperRightMenu}
              onPress={() => onRightMenuClick(history)}>
              {ComponentRightButton}
            </TouchableOpacity>
          )}
        </RouterContextConsumer>
      </View>
    );
  }
}

export default HeaderBackButton;

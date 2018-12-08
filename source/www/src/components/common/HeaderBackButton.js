// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { RouterContextConsumer } from '../context/router.context';
import { Text, ButtonRouter } from '../common';
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
          <ButtonRouter
            activeOpacity={0.8}
            style={styles.wrapperLeftMenu}
            onPress={(history: History) => {
              history.goBack();
            }}>
            <FontAwesomeIcon icon={faAngleLeft} color={Colors.primary} size="3x"  />
          </ButtonRouter>
        )}
        <View style={styles.wrapperCenterMenu}>
          {ComponentMid}
          {title ? <Text style={styles.title}>{title}</Text> : <View />}
        </View>
        <ButtonRouter
          activeOpacity={0.8}
          style={styles.wrapperRightMenu}
          onPress={(history: History) => onRightMenuClick(history)}>
          {ComponentRightButton}
        </ButtonRouter>
      </View>
    );
  }
}

export default HeaderBackButton;

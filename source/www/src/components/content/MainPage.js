// @flow

import React from 'react';
import {View} from 'react-native'
import Colors from '../../utils/colors';
import HeaderMain from './HeaderMain';
import ContentMain from './ContentMain';
import FooterMain from './FooterMain';
import {RouterContextConsumer} from '../router.context';
import type {History} from '../types.shared';

const styles = {
  mainBackground: {
    backgroundColor: Colors.mainBackground,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};

const MainPage = () => {
  return (
    <RouterContextConsumer>
      {({history}: {history: History}) => {
        const {matpel, to = 1} = history.getCurrentState();

        return (
          <View style={styles.mainBackground}>
            <HeaderMain matpel={matpel} />
            <ContentMain matpel={matpel} to={to} history={history} />
            <FooterMain history={history} />
          </View>
        );
      }}
    </RouterContextConsumer>
  );
};

export default MainPage;

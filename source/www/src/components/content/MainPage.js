// @flow

import React from 'react';
import {View} from 'react-native'
import Colors from '../../utils/colors';
import HeaderMain from './HeaderMain';
import MainBoard from './MainBoard';
import TutorialBoard from './TutorialBoard';
import FooterMain from './FooterMain';
import {RouterContextConsumer} from '../context/router.context';
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
  content: {
    margin: 8,
    padding: 16,
    borderWidth: 3,
    borderColor: Colors.white,
  },
};

const MainPage = () => (
  <RouterContextConsumer>
    {({history}: {history: History}) => {
      const {matpel, to = 1, mode} = history.getCurrentState();

      return (
        <View style={styles.mainBackground}>
          <HeaderMain matpel={matpel} showTimer={mode !== 'tutorial'} />
          <View style={styles.content}>
            {mode === 'tutorial' ?
              (
                <TutorialBoard />
              ) :
              (
                <MainBoard
                  matpel={matpel}
                  to={to}
                  history={history}
                />
              )
            }
          </View>
          <FooterMain history={history} />
        </View>
      );
    }}
  </RouterContextConsumer>
);

export default MainPage;

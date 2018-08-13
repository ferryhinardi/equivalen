import React from 'react';
import {View} from 'react-native'
import Colors from '../../utils/colors';
import HeaderMain from './HeaderMain';
import ContentMain from './ContentMain';

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

const MainPage = () => (
  <View style={styles.mainBackground}>
    <HeaderMain />
    <ContentMain />
  </View>
);

export default MainPage;

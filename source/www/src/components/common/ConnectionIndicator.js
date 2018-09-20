// @flow

import React from 'react';
import { View } from 'react-native';
import { ConnectionConsumer } from '../context/connection.context';
import Colors from '../../utils/colors';

type Props = {};

const styles = {
  indicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
};

const ConnectionIndicator = (props: Props) => (
  <ConnectionConsumer>
    {({ onLine }: { onLine: boolean }) => {
      const backgroundStyle = onLine ?
      { backgroundColor: Colors.green } :
      { backgroundColor: Colors.red };

      return (
        <View style={[styles.indicator, backgroundStyle]} />
      );
    }}
  </ConnectionConsumer>
);

export default ConnectionIndicator;

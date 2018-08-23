// @flow

import React from 'react';
import {View} from 'react-native';
import {Video} from '../common';
import type {MatPel} from '../types.shared';

type Props = {
  matpel: MatPel,
  to: string,
  page: number,
};

const styles = {
  container: {padding: 16, flex: 8},
};

const TutorialBoard = (props: Props) => {
  const uri = `https://storage.googleapis.com/video-learning/${props.matpel}-to-${props.to}-no-${props.page}-tutorial.mp4`;
  return (
    <View style={styles.container}>
      <Video source={{uri}} style={{width: '100%', height: 400}} controls />
    </View>
  );
}

export default TutorialBoard;

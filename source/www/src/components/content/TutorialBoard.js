// @flow

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Video} from '../common';
import Colors from '../../utils/colors';

type Props = {};

const styles = {
  container: {padding: 16},
  headerText: {color: Colors.white, fontSize: 24},
};

const uri = 'https://storage.googleapis.com/video-learning/indo-to-1-no-1-tutorial.mp4';

class TutorialBoard extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Video Pembahasan</Text>
        <Video source={{uri}} style={{width: '100%', height: 400}} controls />
      </View>
    );
  }
}

export default TutorialBoard;

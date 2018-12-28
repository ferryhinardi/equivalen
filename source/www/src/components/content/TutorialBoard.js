// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import isElectronRenderer from 'is-electron-renderer';
import Video from '../video';
import { PathConsumer } from '../context/path.context';
import type { MatPel, DataQuestion } from '../types.shared';

type Props = {
  matpel: MatPel,
  to: number,
  page: number,
  dataQuestion?: DataQuestion,
};

const styles = {
  container: { padding: 16, flex: 8 },
};

const mapStateToProps = state => {
  const { currentMatpel, userLessonData } = state.main;
  const { dataQuestion } = userLessonData[currentMatpel];

  return { dataQuestion };
};

@connect(mapStateToProps)
class TutorialBoard extends Component<Props> {
  render() {
    const { matpel, page, dataQuestion } = this.props;
    const { to, page: number } = dataQuestion[page];
    let uri = '';
    let exists = null;
    // const filename = 'bhsindo-to-1-no-2-tutorial.mp4';
    const filename = `${matpel}-to-${to}-no-${number}-tutorial.mp4`;
    const uriCloud = `https://storage.googleapis.com/video-learn/${filename}`;

    return (
      <View style={styles.container}>
        <PathConsumer>
          {({ paths }) => {
            const uriLocal = `${paths.video}/${filename}`;
            uri = uriCloud;

            if (isElectronRenderer) {
              exists = require('electron').ipcRenderer.sendSync('is-exists-file', uriLocal);

              if (exists) uri = uriLocal;
            }

            return (
              <Video
                source={{ uri }}
                volume={1}
                style={{ width: '100%', height: 400 }}
                showDwnldBtn={!exists}
              />
            );
          }}
        </PathConsumer>
      </View>
    );
  }
}

export default TutorialBoard;

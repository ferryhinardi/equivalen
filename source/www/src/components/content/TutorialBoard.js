// @flow

import React from 'react';
import { View } from 'react-native';
import isElectronRenderer from 'is-electron-renderer';
import Video from '../video';
import { PathConsumer } from '../context/path.context';
import type { MatPel } from '../types.shared';

type Props = {
  matpel: MatPel,
  to: number,
  page: number,
};

const styles = {
  container: { padding: 16, flex: 8 },
};

const TutorialBoard = (props: Props) => {
  let uri = '';
  let exists = null;
  // const filename = 'bhsindo-to-1-no-2-tutorial.mp4';
  const filename = `${props.matpel}-to-${props.to}-no-${props.page}-tutorial.mp4`;
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
              style={{width: '100%', height: 400}}
              showDwnldBtn={!exists}
            />
          );
        }}
      </PathConsumer>
    </View>
  );
}

export default TutorialBoard;

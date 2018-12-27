// @flow

import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import isElectron from 'is-electron-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import Colors from '../../utils/colors';
import { PropTypes } from 'prop-types';

type Props = {
  source: Object | string,
  style?: PropTypes.StyleSheet,
  onAfterDownload?: Function,
};

type State = {
  downloadProgress: number,
  isDownloading: boolean,
};

class DownloadButton extends Component<Props, State> {
  state = {
    downloadProgress: 0,
    isDownloading: false,
  };

  componentDidMount() {
    if (isElectron) {
      require('electron').ipcRenderer.on('on-progress-video', (event, args) => {
        const downloadProgress = (args || 0) * 100;
        this.setState({ downloadProgress });

        if (downloadProgress === 100) {
          this.setState({ isDownloading: false });
          this.props.onAfterDownload && this.props.onAfterDownload();
        }
      });
    }
  }

  handleDownload = (videoUrl: Object | string) => {
    if (isElectron) {
      const result = require('electron').ipcRenderer.sendSync('save-video-learning', {
        video: videoUrl,
      });

      console.log('result', result);

      this.setState({ isDownloading: true });
    }
  };

  render() {
    const { source, style } = this.props;
    if (isElectron) {
      require('electron').ipcRenderer.on('getAppPath', (event, args) => {
        console.log('args', args);
      });
    }
    return (
      <TouchableOpacity onPress={() => this.handleDownload(source)} style={style}>
        <FontAwesomeIcon icon={faDownload} color={Colors.primary} size="lg" />
        {this.state.isDownloading ? (
          <progress min="0" max="100" value={this.state.downloadProgress} style={{ width: '100%' }} />
        ) : null}
      </TouchableOpacity>
    );
  }
}

export default DownloadButton;

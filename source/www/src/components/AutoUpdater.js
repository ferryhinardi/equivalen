// @flow

import React, {Component} from 'react';
import {IpcRenderer} from 'electron';

class AutoUpdater extends Component {
  state = {
    titleUpdate: 'No updates ready',
  };

  componentDidMount() {
    // wait for an updateReady message

    IpcRenderer.on('updateReady', (event, text) => {
      // changes the text of the button
      this.setState({titleUpdate: 'new version ready!'});
    });
  }

  onClickUpdate = () => {
    IpcRenderer.send('quitAndInstall');
  };

  render() {
    return <button title={this.state.titleUpdate} onClick={this.onClickUpdate} />;
  }
}

export default AutoUpdater;

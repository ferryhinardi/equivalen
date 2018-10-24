// @flow

import React, { Component } from 'react';
import isElectron from 'is-electron-renderer';
import { Client } from '@equivalen/electron-connect';

type Props = { children: React$Node };
type State = { onLine: boolean };

const SocketContext: Object = React.createContext();

export class SocketProvider extends Component<Props, State> {
  client: any;

  state = {
    onLine: false,
  };

  componentDidMount() {
    if (isElectron) {
      const mainWindow = require('electron').remote.getCurrentWindow();
      this.client = new Client().join(mainWindow);
      this.client.socket.start();

      this.client.socket.on('connect', () => {
        if (!this.state.onLine) {
          this.setState({ onLine: true });
        }
      });

      this.client.socket.on('reconnect', () => {
        if (!this.state.onLine) {
          this.setState({ onLine: true });
        }
      });

      this.client.socket.on('disconnected', () => {
        if (this.state.onLine) {
          this.setState({ onLine: false });
        }
      });

      this.client.socket.on('socket-data', this.onReceiveData);
    }
  }

  onReceiveData = (data: any) => {
    console.log('data message', data);
  };

  render() {
    return (
      <SocketContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

export const SocketConsumer = SocketContext.Consumer;

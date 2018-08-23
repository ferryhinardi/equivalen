// @flow

import React, {Component} from 'react';
import {ipcRenderer} from 'electron';
import isElectron from 'is-electron-renderer';

type Props = {children: React$Node};
type State = {appVersion: string};

const AppVersionContext: Object = React.createContext();

export class AppVersionProvider extends Component<Props, State> {
  state = {
    appVersion: '',
  };

  componentDidMount() {
    if (isElectron) {
      ipcRenderer.on('app-version', (event, args) =>
        this.setState({appVersion: args})
      );
    }
  }

  render() {
    return (
      <AppVersionContext.Provider value={{appVersion: this.state.appVersion}}>
        {this.props.children}
      </AppVersionContext.Provider>
    );
  }
}

export const AppVersionConsumer = AppVersionContext.Consumer;

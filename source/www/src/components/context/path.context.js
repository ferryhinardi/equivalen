// @flow

import React, { Component } from 'react';
import isElectron from 'is-electron-renderer';

type Props = { children: React$Node };
type State = { paths: Object };

const PathContext: Object = React.createContext();

export class PathProvider extends Component<Props, State> {
  state = {
    paths: {},
  };

  componentDidMount() {
    if (isElectron) {
      require('electron').ipcRenderer.on('paths', (event, args) => {
        const paths = JSON.parse(args);
        this.setState({ paths });
      });
    }
  }

  render() {
    return (
      <PathContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </PathContext.Provider>
    );
  }
}

export const PathConsumer = PathContext.Consumer;

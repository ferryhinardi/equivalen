// @flow

import React, {Component} from 'react';
import {ElectronContextProvider} from './electron.context';
import {RouterContextProvider} from './router.context';

type Props = {
  children: React$Node,
  history: {
    action: string,
    block: () => void,
    createHref: (location: string) => void,
    go: (n: number) => void,
    goBack: () => void,
    goForward: () => void,
    location: {
      hash: string,
      key: string,
      pathname: string,
      search: string,
      state?: string,
    },
    listen: (listener: any) => void,
    push: (path: string, state: string) => void,
    replace: (path: string, state: string) => void,
  },
};

class Root extends Component<Props> {
  render() {
    return (
      <ElectronContextProvider>
        <RouterContextProvider history={this.props.history}>
          {this.props.children}
        </RouterContextProvider>
      </ElectronContextProvider>
    );
  }
}

export default Root;

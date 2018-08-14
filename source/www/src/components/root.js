// @flow

import React, {Component} from 'react';
import {ElectronContextProvider} from './electron.context';
import {RouterContextProvider} from './router.context';
import type {History} from './types.shared';

type Props = {
  children: React$Node,
  history: History,
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

// @flow

import React, { Component } from 'react';
import { RouterContextProvider } from './context/router.context';
import { AppVersionProvider } from './context/appversion.context';
import type { History } from './types.shared';

type Props = {
  children: React$Node,
  history: History,
};

class Root extends Component<Props> {
  render() {
    return (
      <RouterContextProvider history={this.props.history}>
        <AppVersionProvider>
          {this.props.children}
        </AppVersionProvider>
      </RouterContextProvider>
    );
  }
}

export default Root;

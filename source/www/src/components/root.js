// @flow

import React, {Component} from 'react';
import {RouterContextProvider} from './context/router.context';
import type {History} from './types.shared';

type Props = {
  children: React$Node,
  history: History,
};

class Root extends Component<Props> {
  render() {
    return (
      <RouterContextProvider history={this.props.history}>
        {this.props.children}
      </RouterContextProvider>
    );
  }
}

export default Root;

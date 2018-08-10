// @flow

import React, {Component} from 'react';
import {RootContextProvider} from './root.context';

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
      <RootContextProvider history={this.props.history}>
        {this.props.children}
      </RootContextProvider>
    );
  }
}

export default Root;

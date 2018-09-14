// @flow

import React, { Component } from 'react';

const PersistorContext: Object = React.createContext();

type Props = {
  children: React$Node,
  persistor: {
    purge: Function,
    flush: Function,
    pause: Function,
    persist: Function,
  },
};

export class PersistorProvider extends Component<Props> {
  render() {
    return (
      <PersistorContext.Provider
        value={{ persistor: this.props.persistor }}>
        {this.props.children}
      </PersistorContext.Provider>
    );
  }
}

export const PersistorConsumer = PersistorContext.Consumer;

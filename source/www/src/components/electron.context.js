// @flow

import React, {Component} from 'react';

type Props = {
  children: React$Node,
};

type State = {
  electron: ?Object,
};

const ElectronContext = React.createContext();

export class ElectronContextProvider extends Component<Props, State> {
  state = {
    electron: null,
  };

  componentDidMount() {
    if (window.electron && !this.state.electron) {
      this.setState({
        electron: {
          ...window.electron,
          isWindowElectron: true,
        },
      });
    } else {
      this.setState({
        electron: {
          isWindowElectron: false,
        },
      });
    }
  }

  render() {
    return (
      <ElectronContext.Provider
        value={{
          ...this.state,
        }}>
        {this.props.children}
      </ElectronContext.Provider>
    );
  }
}

export const ElectronContextConsumer = ElectronContext.Consumer;

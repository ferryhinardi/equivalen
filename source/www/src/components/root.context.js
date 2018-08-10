// @flow

import React, {Component} from 'react';

type Props = {
  children: React$Node,
};

type State = {
  electron: ?Object,
};

const RootContext = React.createContext();

export class RootContextProvider extends Component<Props, State> {
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
      <RootContext.Provider
        value={{
          ...this.state,
        }}>
        {this.props.children}
      </RootContext.Provider>
    );
  }
}

export const RootContextConsumer = RootContext.Consumer;

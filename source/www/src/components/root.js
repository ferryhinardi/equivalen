// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
  static childContextTypes = {
    history: PropTypes.object,
  };

  static propTypes = {
    history: PropTypes.object,
  };

  getChildContext() {
    return {
      history: this.props.history,
    };
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default Root;

// @flow

import React, {Component} from 'react';
import {Linking} from 'react-native';

type Props = {
  children: React$Node,
};

class Root extends Component<Props> {
  componentDidMount() {
    Linking.getInitialURL().then((url) => {
      console.log('url', url);
    });
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default Root;

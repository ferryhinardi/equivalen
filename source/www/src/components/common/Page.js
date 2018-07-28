// @flow

import React, {Component} from 'react';
import {View} from 'react-native';

type Props = {
  children: React$Node,
  backgroundColor?: string,
};

const styles = {
  body: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    maxWidth: 360,
  },
};

class Page extends Component<Props> {
  render() {
    const {children, backgroundColor} = this.props;
    const style = Object.assign({}, styles.body, {backgroundColor});
    return (
      <View style={style}>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    );
  }
}

export default Page;

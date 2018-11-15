// @flow

import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { RouterContextConsumer } from '../context/router.context';
import type { History } from '../types.shared';

type Props = {
  source: any,
  position: 'left' | 'right',
  onClick?: (history: History) => void,
  isEmpty?: boolean,
};

const styles = {
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  image: {
    width: 320,
    height: 180,
  },
};

class RoleAvatar extends Component<Props>{
  render() {
    const { isEmpty, source, position, onClick } = this.props;
    let style = styles.button;
    const styleLeft = {left: 70};
    const styleRight = {right: 70};

    if (position === 'left') {
      style = {
        ...style,
        ...styleRight,
      };
    } else if (position === 'right') {
      style = {
        ...style,
        ...styleLeft,
      };
    }

    return (
      <RouterContextConsumer>
        {({ history }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={style}
            onPress={() => onClick && onClick(history)}>
            <Image source={isEmpty || source} style={styles.image} />
          </TouchableOpacity>
        )}
      </RouterContextConsumer>
    );
  }
}

export default RoleAvatar;

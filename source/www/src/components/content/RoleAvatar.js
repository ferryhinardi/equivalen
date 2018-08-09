// @flow

import React, {Component} from 'react';
import {Image, TouchableOpacity} from 'react-native';

type Props = {
  source: any,
  position: 'left' | 'right',
  onClick?: () => void,
};

const styles = {
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  image: {width: 320, height: 180},
};

class RoleAvatar extends Component<Props>{
  render() {
    const {source, position, onClick} = this.props;
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
      <TouchableOpacity activeOpacity={0.8} style={style} onPress={onClick}>
        <Image source={source} style={styles.image} />
      </TouchableOpacity>
    );
  }
}

export default RoleAvatar;

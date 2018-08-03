// @flow

import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import avatar from '../../images/assets/teacher.png'
import Colors from '../../utils/colors';

type Props = {
  role: string,
  position: 'left' | 'right',
  empty?: boolean,
  onClick: () => void,
};

const styles = {
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  viewText: {
    position: 'absolute',
    top: '40%',
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  image: {width: 100, height: 100},
};

const RoleText = (props: {padding: Object, text: string}) => {
  let styleText = null;

  if (props.padding) {
    if (props.padding.right) {
      styleText = {textAlign: 'right'};
    } else if (props.padding.left) {
      styleText = {textAlign: 'left'};
    }
  }

  return (
    <View style={[styles.viewText, props.padding]}>
      <Text style={[styles.text, styleText]}>{props.text}</Text>
    </View>
  );
};

class RoleAvatar extends Component<Props>{
  render() {
    const {position, role, empty, onClick} = this.props;
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onClick}>
        {!empty && position === 'left' && (
          <RoleText text={role} padding={{right: '75%'}} />
        )}
        <Image source={empty ? '' : avatar} style={styles.image} />
        {!empty && position === 'right' && (
          <RoleText text={role} padding={{left: '75%'}} />
        )}
      </TouchableOpacity>
    );
  }
}

export default RoleAvatar;

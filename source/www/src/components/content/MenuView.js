// @flow
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

type Props = {
  title: string,
  onClick: () => void,
};

const styles = {
  menuView: {
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 16,
  },
  menuText: {},
};

const MenuView = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.menuView}
      onPress={props.onClick}>
      <Text style={styles.menuText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default MenuView;

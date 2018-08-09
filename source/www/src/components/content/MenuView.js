// @flow
import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import images from '../../images/encode_images';

type Props = {
  title: 'bhsindo' | 'bhsing' | 'mat' | 'ipa',
  onClick: () => void,
};

const styles = {
  menuView: {
    padding: 16,
  },
  menuIcon: {
    width: 180,
    height: 180,
  },
  menuText: {
    width: 180,
    height: 75,
  },
};

const MenuView = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.menuView}
      onPress={props.onClick}>
      <Image source={images[`img_icon_${props.title}`]} style={styles.menuIcon} />
      <Image source={images[`img_texticon_${props.title}`]} style={styles.menuText} />
    </TouchableOpacity>
  );
};

export default MenuView;

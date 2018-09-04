// @flow

import React from 'react';
import { Text } from 'react-native';
import { ButtonHoverContextProvider, ButtonHoverContextConsumer } from '../context/buttonhover.context';
import Colors from '../../utils/colors';
import { COMIC_SANS } from '../fonts';

type Props = {
  text: string,
  header?: boolean,
  right?: boolean,
  onClick?: () => void,
};

const styles = {
  wrapperMenu: { padding: 8 },
  menuText: { fontSize: 20, fontFamily: COMIC_SANS },
};

const MenuButton = (props: Props) => {
  const styleTextBold = props.header ? { fontWeight: 'bold' } : {};
  const styleTextAlign = props.right ? { textAlign: 'right' } : { textAlign: 'center' };
  return (
    <ButtonHoverContextProvider
      style={styles.wrapperMenu}
      focusStyle={{}}
      onPress={() => props.onClick && props.onClick()}>
      <ButtonHoverContextConsumer>
        {({ focused }) => {
          const styleFocusMenu = focused ? {
            ...styles.menuText,
            ...styleTextBold,
            ...styleTextAlign,
            color: Colors.mainBackground,
          } : {
            ...styleTextBold,
            ...styleTextAlign,
            ...styles.menuText,
          };

          return (
            <Text style={styleFocusMenu}>{props.text}</Text>
          );
        }}
      </ButtonHoverContextConsumer>
    </ButtonHoverContextProvider>
  );
};

export default MenuButton;

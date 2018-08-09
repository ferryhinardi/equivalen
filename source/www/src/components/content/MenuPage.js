// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Page} from '../common';
import MenuView from './MenuView';
import Colors from '../../utils/colors';

type Props = {};

const styles = {
  containerMenu: {
    flexDirection: 'row',
  },
};
const menus = ['bhsindo', 'bhsing', 'mat', 'ipa'];

class MenuPage extends Component<Props> {
  static contextTypes = {
    history: PropTypes.object,
  };

  render() {
    return (
      <Page backgroundColor={Colors.mainBackground} flexDirection="row">
        {menus.map(menu => <MenuView key={menu} title={menu} />)}
      </Page>
    );
  }
}

export default MenuPage;

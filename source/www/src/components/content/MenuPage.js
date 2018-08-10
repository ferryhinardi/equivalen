// @flow

import React, {Component} from 'react';
import {Page} from '../common';
import MenuView from './MenuView';
import Colors from '../../utils/colors';
import {RootContextConsumer} from '../root.context';

type Props = {};
const menus = ['bhsindo', 'bhsing', 'mat', 'ipa'];

class MenuPage extends Component<Props> {
  _onClickMenu = (electron) => {
    if (electron.isWindowElectron) {
      electron.ipcRenderer
        .send('show-modal-popup', {
          title: 'Tryout',
          meesage: '<p>Tryout 1</p>',
          buttons: [],
        });
    }
  };

  render() {
    return (
      <Page backgroundColor={Colors.mainBackground} flexDirection="row">
        {menus.map(menu => (
          <RootContextConsumer key={menu}>
            {({electron}) => (
              <MenuView
                title={menu}
                onClick={() => this._onClickMenu(electron)}
              />
            )}
          </RootContextConsumer>
        ))}
      </Page>
    );
  }
}

export default MenuPage;

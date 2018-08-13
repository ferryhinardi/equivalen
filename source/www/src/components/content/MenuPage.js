// @flow

import React, {Component} from 'react';
import {Page} from '../common';
import MenuView from './MenuView';
import ModalTryout from './ModalTryout';
import Colors from '../../utils/colors';
import {RootContextConsumer} from '../root.context';
import type {History} from '../types.shared';

type Props = {history: History};
type State = {isOpenModal: boolean};
const menus = ['bhsindo', 'bhsing', 'mat', 'ipa'];

class MenuPage extends Component<Props, State> {
  state = {
    isOpenModal: false,
  };

  _onClickMenu = (electron) => {
    // if (electron.isWindowElectron) {
    //   electron.ipcRenderer
    //     .send('show-modal-popup', {
    //       title: 'Tryout',
    //       meesage: '<p>Tryout 1</p>',
    //       buttons: [],
    //     });
    // }
    this.openModal();
  };

  openModal = () => {
    this.setState({isOpenModal: true});
  };

  closeModal = () => {
    this.setState({isOpenModal: false});
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
        <ModalTryout
          open={this.state.isOpenModal}
          close={this.closeModal}
          history={this.props.history}
        />
      </Page>
    );
  }
}

export default MenuPage;

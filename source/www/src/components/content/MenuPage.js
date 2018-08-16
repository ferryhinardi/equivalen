// @flow

import React, {Component} from 'react';
import {Page} from '../common';
import MenuView from './MenuView';
import ModalTryout from './ModalTryout';
import {storeItem} from '../../utils/asyncStore';
import Colors from '../../utils/colors';
import {ElectronContextConsumer} from '../context/electron.context';
import {RouterContextConsumer} from '../context/router.context';
import type {History, MatPel} from '../types.shared';

const menus = ['bhsindo', 'bhsing', 'mat', 'ipa'];
type Props = {history: History, matpel: MatPel};
type State = {isOpenModal: boolean, matpel: MatPel};

class MenuPage extends Component<Props, State> {
  state = {
    isOpenModal: false,
    matpel: 'bhsindo',
  };

  _onClickMenu = (electron, matpel) => {
    // if (electron.isWindowElectron) {
    //   electron.ipcRenderer
    //     .send('show-modal-popup', {
    //       title: 'Tryout',
    //       meesage: '<p>Tryout 1</p>',
    //       buttons: [],
    //     });
    // }
    storeItem('matpel', matpel).then(() => this.openModal(matpel));
  };

  openModal = (matpel: MatPel) => {
    this.setState({isOpenModal: true, matpel});
  };

  closeModal = () => {
    this.setState({isOpenModal: false});
  };

  render() {
    return (
      <Page backgroundColor={Colors.mainBackground} flexDirection="row">
        {menus.map(menu => (
          <ElectronContextConsumer key={menu}>
            {({electron}) => (
              <MenuView
                title={menu}
                onClick={() => this._onClickMenu(electron, menu)}
              />
            )}
          </ElectronContextConsumer>
        ))}
        <RouterContextConsumer>
          {({history}) => (
            <ModalTryout
              open={this.state.isOpenModal}
              matpel={this.state.matpel}
              close={this.closeModal}
              history={history}
            />
          )}
        </RouterContextConsumer>
      </Page>
    );
  }
}

export default MenuPage;

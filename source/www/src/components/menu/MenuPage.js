// @flow

import React, { Component } from 'react';
import { Page } from '../common';
import MenuView from './MenuView';
import { ModalTryout } from '../modal';
import Colors from '../../utils/colors';
import { RouterContextConsumer } from '../context/router.context';
import type { MatPel } from '../types.shared';
import { setStore } from '../../utils/store';

const menus = ['bhsindo', 'bhsing', 'mat', 'ipa'];
type Props = {};
type State = {isOpenModal: boolean, matpel: MatPel};

class MenuPage extends Component<Props, State> {
  state = {
    isOpenModal: false,
    matpel: 'bhsindo',
  };

  _onClickMenu = (matpel) => {
    setStore('matpel', matpel).then(() => this.openModal(matpel));
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
          <MenuView
            key={menu}
            title={menu}
            onClick={() => this._onClickMenu(menu)}
          />
        ))}
        {this.state.isOpenModal && (
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
        )}
      </Page>
    );
  }
}

export default MenuPage;

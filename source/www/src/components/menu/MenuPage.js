// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import globalAction from '../../actions/global';
import { Page } from '../common';
import { withModalTryout } from '../modal';
import MenuView from './MenuView';
import Colors from '../../utils/colors';
import { setStore } from '../../utils/store';

const menus = ['bhsindo', 'bhsing', 'mat', 'ipa'];
type Props = {
  showModalTryout: boolean,
  globalActionCreator?: Object,
  renderModal?: () => void,
};

const mapStateToProps = state => ({
  showModalTryout: state.global.showModalTryout,
});

const mapDispatchToProps = dispatch => ({
  globalActionCreator: bindActionCreators(globalAction, dispatch),
});

@withModalTryout
@connect(mapStateToProps, mapDispatchToProps)
class MenuPage extends Component<Props> {
  _onClickMenu = (matpel) => {
    setStore('matpel', matpel).then(() => {
      this.props.globalActionCreator &&
        this.props.globalActionCreator.setMatpelAction(matpel);
      this.openModal();
    });
  };

  openModal = () => {
    this.props.globalActionCreator &&
      this.props.globalActionCreator.visibleModalTryoutAction(true);
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
        {this.props.renderModal && this.props.renderModal()}
      </Page>
    );
  }
}

export default MenuPage;

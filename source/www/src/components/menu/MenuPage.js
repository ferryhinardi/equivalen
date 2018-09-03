// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import globalAction from '../../actions/global';
import mainAction from '../../actions/main';
import { Page } from '../common';
import { withModalTryout } from '../modal';
import MenuView from './MenuView';
import Colors from '../../utils/colors';
import type { MatPel } from '../types.shared';

const menus = ['bhsindo', 'bhsing', 'mat', 'ipa'];
type Props = {
  showModalTryout: boolean,
  globalActionCreator?: Object,
  mainActionCreator?: Object,
  renderModal?: (matpel: ?MatPel) => void,
};

type State = { matpel: ?MatPel };

const mapStateToProps = state => ({
  showModalTryout: state.global.showModalTryout,
});

const mapDispatchToProps = dispatch => ({
  globalActionCreator: bindActionCreators(globalAction, dispatch),
  mainActionCreator: bindActionCreators(mainAction, dispatch),
});

@withModalTryout
@connect(mapStateToProps, mapDispatchToProps)
class MenuPage extends Component<Props, State> {
  state = {
    matpel: null,
  };

  _onClickMenu = (matpel) => {
    this.setState({ matpel }, () => {
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
        {this.props.renderModal && this.props.renderModal(this.state.matpel)}
      </Page>
    );
  }
}

export default MenuPage;

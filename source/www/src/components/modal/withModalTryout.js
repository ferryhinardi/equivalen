// @flow

import React, { type ComponentType } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ModalTryout from './ModalTryout';
import globalAction from '../../actions/global';

type PropsWrapper = {
  showModalTryout: boolean,
  globalActionCreator?: Object,
};

export default function withModalTryout(Component: ComponentType<*>) {
  const mapStateToProps = state => ({
    showModalTryout: state.global.showModalTryout,
  });

  const mapDispatchToProps = dispatch => ({
    globalActionCreator: bindActionCreators(globalAction, dispatch),
  });

  @connect(mapStateToProps, mapDispatchToProps)
  class ModalTryoutWrapper extends React.PureComponent<PropsWrapper> {
    closeModal = () => {
      this.props.globalActionCreator.visibleModalTryoutAction(false);
    };

    renderModal = () => (
      <ModalTryout open={this.props.showModalTryout} close={this.closeModal} />
    )

    render() {
      return <Component {...this.props} renderModal={this.renderModal} />;
    }
  }

  return ModalTryoutWrapper;
}


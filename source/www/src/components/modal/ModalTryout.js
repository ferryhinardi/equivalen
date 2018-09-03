// @flow

import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import globalAction from '../../actions/global';
import mainAction from '../../actions/main';
import { Modal } from '../common';
import Colors from '../../utils/colors';
import { RouterContextConsumer } from '../context/router.context';
import { ButtonHoverContextProvider, ButtonHoverContextConsumer } from '../context/buttonhover.context';
import type { History, MatPel } from '../types.shared';
import data from '../../data';

type Props = {
  open: boolean,
  close: () => void,
  matpel: MatPel,
};

const styles = {
  content: {
    width: 200,
    top: '50%',
    left: '50%',
    bottom: 'auto',
    right: 'auto',
    padding: 3,
    transform: 'translate(-50%, -50%)',
  },
  containerHeader: {
    backgroundColor: '#777',
    padding: 10,
  },
  headerFooter: {
    color: Colors.white,
    textAlign: 'center',
  },
  containerContent: {
    padding: 10,
  },
  footerContainer: {
    backgroundColor: Colors.red,
  },
};

const mapDispatchToProps = dispatch => ({
  globalActionCreator: bindActionCreators(globalAction, dispatch),
  mainActionCreator: bindActionCreators(mainAction, dispatch),
});

@connect(null, mapDispatchToProps)
class TryoutButton extends Component<{
  label: string,
  matpel: MatPel,
  toId: number,
  globalActionCreator?: Object,
  mainActionCreator?: Object,
}> {

  onPickTryout = (matpel: MatPel, toId: number, history: History) => {
    if (this.props.mainActionCreator) {
      this.props.mainActionCreator.resetTimeAction();
      this.props.mainActionCreator.setMatpelAction(matpel);
      this.props.mainActionCreator.setTryoutAction(toId);
      this.props.mainActionCreator.setAnswerAction({});
    }

    if (this.props.globalActionCreator) {
      this.props.globalActionCreator.visibleModalTryoutAction(false);
    }

    history.transitionTo('/main');
  };

  render() {
    const { label, matpel, toId } = this.props;

    return (
      <RouterContextConsumer>
        {({history}) => (
          <ButtonHoverContextProvider
            focusStyle={{backgroundColor: '#2699d0'}}
            style={styles.containerContent}
            onPress={() => this.onPickTryout(matpel, toId, history)}>
            <ButtonHoverContextConsumer>
              {({ focused }) => {
                const hoverTextStyle = focused ? {color: Colors.white} : {};
                return <Text style={hoverTextStyle}>{label}</Text>
              }}
            </ButtonHoverContextConsumer>
          </ButtonHoverContextProvider>
        )}
      </RouterContextConsumer>
    );
  }
}

class ModalTryout extends Component<Props> {
  render() {
    const { matpel } = this.props;
    const lessonData = data[matpel] || {};

    return (
      <Modal
        isOpen={this.props.open}
        onRequestClose={this.props.close}
        style={styles}
        ariaHideApp={false}>
        <View style={styles.containerHeader}>
          <Text style={styles.headerFooter}>Pilih Tryout</Text>
        </View>
        {(lessonData.tryouts || []).map((tryout, idx) => (
          <TryoutButton
            key={tryout}
            label={tryout}
            matpel={matpel}
            toId={idx + 1}
          />
        ))}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.containerContent, styles.footerContainer]}
          onPress={this.props.close}>
          <Text style={styles.headerFooter}>Tutup</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default ModalTryout;

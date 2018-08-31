// @flow

import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import globalAction from '../../actions/global';
import { Modal } from '../common';
import Colors from '../../utils/colors';
import { RouterContextConsumer } from '../context/router.context';
import { ButtonHoverContextProvider, ButtonHoverContextConsumer } from '../context/buttonhover.context';
import type { History, MatPel } from '../types.shared';
import { setStore, getStore } from '../../utils/store';
import data from '../../data';

type Props = {
  open: boolean,
  close: () => void,
  userPickLesson: {
    matpel: MatPel,
    to: string,
  },
};
type State = {
  lessonData: Object,
  loading: boolean,
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
});

@connect(null, mapDispatchToProps)
class TryoutButton extends Component<{
  label: string,
  toId: number,
  globalActionCreator?: Object
}> {

  onPickTryout = (toId: number, history: History) => {
    setStore('to', toId);
    setStore('answer', {});

    getStore('matpel').then((matpel) => {
      if (this.props.globalActionCreator) {
        this.props.globalActionCreator.setMatpelAction(matpel);
        this.props.globalActionCreator.setTryoutAction(toId);
        this.props.globalActionCreator.visibleModalTryoutAction(false);
      }
    })

    history.transitionTo('/main');
  };

  render() {
    const { label, toId } = this.props;

    return (
      <RouterContextConsumer>
        {({history}) => (
          <ButtonHoverContextProvider
            focusStyle={{backgroundColor: '#2699d0'}}
            style={styles.containerContent}
            onPress={() => this.onPickTryout(toId, history)}>
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

const mapStateToProps = state => ({
  userPickLesson: state.global.userPickLesson,
});

@connect(mapStateToProps)
class ModalTryout extends Component<Props, State> {

  state = {
    lessonData: {
      tryouts: [],
    },
    loading: true,
  };

  async componentDidMount() {
    const matpel = await getStore('matpel') || this.props.userPickLesson.matpel;

    this.setState({lessonData: data[matpel], loading: false})
  }

  render() {
    return !this.state.loading && (
      <Modal
        isOpen={this.props.open}
        onRequestClose={this.props.close}
        style={styles}
        ariaHideApp={false}>
        <View style={styles.containerHeader}>
          <Text style={styles.headerFooter}>Pilih Tryout</Text>
        </View>
        {(this.state.lessonData.tryouts || []).map((tryout, idx) => (
          <TryoutButton key={tryout} label={tryout} toId={idx + 1} />
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

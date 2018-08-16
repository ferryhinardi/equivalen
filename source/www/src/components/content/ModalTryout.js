// @flow

import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Modal} from '../common';
import Colors from '../../utils/colors';
import type {History, MatPel} from '../types.shared';
import {getStore, storeItem} from '../../utils/asyncStore';
import data from '../../data';

type Props = {
  open: boolean,
  close: () => void,
  history: History,
  matpel: MatPel,
};
type State = {
  hoverNumberButton: number,
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

class ModalTryout extends Component<Props, State> {

  state = {
    hoverNumberButton: -1,
    lessonData: {},
    loading: true,
  };

  async componentDidMount() {
    getStore('matpel').then(lesson => this.setState({lessonData: data[lesson], loading: false}));
  }

  onMouseHoverTryout = (index: number) => {
    this.setState({hoverNumberButton: index});
  };

  onPickTryout = (index: number) => {
    const params = {
      to: index + 1,
      matpel: this.props.matpel,
    };
    storeItem('to', params.to).then(
      () => this.props.history.transitionTo('/main', params)
    );
  };

  render() {
    return !this.state.loading && (
      <Modal
        isOpen={this.props.open}
        style={styles}
        ariaHideApp={false}
      >
        <View style={styles.containerHeader}>
          <Text style={styles.headerFooter}>Pilih Tryout</Text>
        </View>
        {this.state.lessonData.tryouts.map((tryout, idx) => {
          const hoverButtonStyle = this.state.hoverNumberButton === idx ? {backgroundColor: '#2699d0'} : {};
          const hoverTextStyle = this.state.hoverNumberButton === idx ? {color: Colors.white} : {};
          return (
            <TouchableOpacity
              key={tryout}
              activeOpacity={0.8}
              style={[styles.containerContent, hoverButtonStyle]}
              onMouseEnter={() => this.onMouseHoverTryout(idx)}
              onMouseLeave={() => this.setState({hoverNumberButton: -1})}
              onPress={() => this.onPickTryout(idx)}>
              <Text style={hoverTextStyle}>{tryout}</Text>
            </TouchableOpacity>
          );
        })}
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

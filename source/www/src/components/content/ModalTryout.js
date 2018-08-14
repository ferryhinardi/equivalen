// @flow

import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Modal} from '../common';
import Colors from '../../utils/colors';
import type {History, MatPel} from '../types.shared';

type Props = {
  open: boolean,
  close: () => void,
  history: History,
  matpel: MatPel,
};
type State = {
  hoverNumberButton: number,
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
const tryouts = [
  'Tryout 1',
  'Tryout 2',
  'Tryout 3',
  'Tryout 4',
  'Tryout 5',
  'Tryout 6',
  'Tryout 7',
  'Tryout 8',
  'Tryout 9',
];

class ModalTryout extends Component<Props, State> {

  state = {
    hoverNumberButton: -1,
  };

  onMouseHoverTryout = (index: number) => {
    this.setState({ hoverNumberButton: index });
  };

  onPickTryout = (index: number) => {
    this.props.history.transitionTo('/main', {
      to: index + 1,
      matpel: this.props.matpel,
    });
  };

  render() {
    return (
      <Modal
        isOpen={this.props.open}
        style={styles}
        ariaHideApp={false}
      >
        <View style={styles.containerHeader}>
          <Text style={styles.headerFooter}>Pilih Tryout</Text>
        </View>
        {tryouts.map((tryout, idx) => {
          const hoverButtonStyle = this.state.hoverNumberButton === idx ? {backgroundColor: '#2699d0'} : {};
          const hoverTextStyle = this.state.hoverNumberButton === idx ? {color: Colors.white} : {};
          return (
            <TouchableOpacity
              key={tryout}
              activeOpacity={0.8}
              style={[styles.containerContent, hoverButtonStyle]}
              onMouseEnter={() => this.onMouseHoverTryout(idx)}
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

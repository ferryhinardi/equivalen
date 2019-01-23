// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Modal, Text } from '../common';
import { ShareArchivePage } from '../share';
import Colors from '../../utils/colors';

type Props = {
  open: boolean,
  close: Function,
};

const styles = {
  content: {
    width: 400,
    top: '50%',
    left: '50%',
    bottom: 'auto',
    right: 'auto',
    padding: 3,
    transform: 'translate(-50%, -50%)',
    maxHeight: 400,
  },
  containerHeader: {
    flexDirection: 'row',
    padding: 10,
  },
  wrapperText: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

class ModalShare extends Component<Props> {
  render() {
    const { open, close } = this.props;
    return (
      <Modal
        isOpen={open}
        onRequestClose={close}
        style={styles}
        ariaHideApp={false}>
        <View style={styles.containerHeader}>
          <View style={styles.wrapperText}>
            <Text style={styles.headerText}>BAGI KE</Text>
          </View>
          <TouchableOpacity activeOpacity={.8} onPress={close}>
            <FontAwesomeIcon icon={faTimes} size="2x" color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <ShareArchivePage />
      </Modal>
    );
  }
}

export default ModalShare;

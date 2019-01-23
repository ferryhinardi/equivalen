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

type FormModalShare = 'choose-user' | 'choose-time' | 'thank-you';
type State = {
  currentForm: FormModalShare,
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

class ModalShare extends Component<Props, State> {
  state = {
    currentForm: 'choose-user',
  };

  goTo = (pageForm: FormModalShare) => {
    this.setState({ currentForm: pageForm });
  };

  render() {
    const { open, close } = this.props;
    const { currentForm } = this.state;
    let Content;

    switch(currentForm) {
    case 'choose-user':
      Content = <ShareArchivePage goTo={this.goTo} />;
      break;
    case 'choose-time':
      Content = null;
      break;
    case 'thank-you':
      Content = null;
      break;
    }

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
        {Content}
      </Modal>
    );
  }
}

export default ModalShare;

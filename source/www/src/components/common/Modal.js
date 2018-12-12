// @flow

import React, {Component} from 'react';
import RModal from 'react-native-modal';
// import RModal from 'react-modal';

type Props = {
  isOpen: boolean,
};

class Modal extends Component<Props> {
  render() {
    return (
      <RModal
        isVisible={this.props.isOpen}
        {...this.props}
      />
    );
  }
}

export default Modal;

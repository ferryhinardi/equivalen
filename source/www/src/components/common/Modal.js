import React, {Component} from 'react';
import RModal from 'react-modal';

class Modal extends Component {
  render() {
    return (
      <RModal
        {...this.props}
      />
    );
  }
}

export default Modal;

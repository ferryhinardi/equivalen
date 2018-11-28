// @flow

import React, { Component } from 'react';
import { HeaderBackButton } from '../common';
import InputArchiveForm from './InputArchiveForm';

type Props = {};

class InputArchiveView extends Component<Props> {
  render() {
    return (
      <React.Fragment>
        <HeaderBackButton />
        <InputArchiveForm />
      </React.Fragment>
    );
  }
}

export default InputArchiveView;

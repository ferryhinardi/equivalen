// @flow

import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '../common';
import { Checkbox } from '../form';
import Colors from '../../utils/colors';

type Props = {
  fullName: string,
  checked?: boolean,
  onClick: Function,
};
const styles = {
  checkbox: {
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  text: { color: Colors.primary },
  footerButton: {
    backgroundColor: Colors.primary,
    padding: 8,
    width: '40%',
    alignSelf: 'center',
    marginVertical: 16,
  },
  footerButtonText: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
};

class ShareArchiveView extends Component<Props> {
  render() {
    const { fullName, checked, onClick } = this.props;

    return (
      <Checkbox
        rightText={fullName}
        isChecked={checked}
        checkBoxColor={Colors.primary}
        uncheckedCheckBoxColor={Colors.primary}
        rightTextStyle={styles.text}
        onClick={onClick}
        style={styles.checkbox}
      />
    );
  }
}

type PropsHeader = { onClick?: (checked: boolean) => void };
type StateHeader = { state: boolean };
export class ShareArchiveHeader extends Component<PropsHeader, StateHeader> {
  state = {
    checked: false,
  };

  onChecked = () => {
    const currentCheck = !this.state.checked;
    this.setState({ checked: currentCheck });

    this.props.onClick && this.props.onClick(currentCheck);
  };

  render() {
    return (
      <Checkbox
        rightText="PILIH SEMUA"
        isChecked={this.state.checked}
        checkBoxColor={Colors.red}
        uncheckedCheckBoxColor={Colors.red}
        rightTextStyle={{ color: Colors.red, fontStyle: 'italic', fontWeight: 'bold' }}
        onClick={this.onChecked}
        style={styles.checkbox}
      />
    );
  }
}

type PropsFooter = { onClick: Function };
export class ShareArchiveFooter extends Component<PropsFooter> {
  render() {
    return (
      <TouchableOpacity
        style={styles.footerButton}
        activeOpacity={.8}
        onPress={this.props.onClick}>
        <Text style={styles.footerButtonText}>LANJUT</Text>
      </TouchableOpacity>
    )
  }
}

export default ShareArchiveView;

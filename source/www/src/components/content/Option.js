// @flow

import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Image from '../common/AutoSizeImage';
import Colors from '../../utils/colors';

type OptionType = 'A' | 'B' | 'C' | 'D';

type Props = {
  optionLabel: OptionType,
  optionImage: Image,
  onClick: (selectedOption: OptionType) => void,
};

type State = {
  hover: boolean,
};

const styles = {
  wrapperOption: {flexDirection: 'row', paddingHorizontal: 8, paddingVertical: 2},
  activeOption: {borderWidth: 2, borderColor: Colors.white},
  choice: {color: Colors.white, fontSize: 24},
};

class Option extends Component<Props, State> {
  state = {hover: false};

  render() {
    const style = Object.assign(
      {},
      styles.wrapperOption,
      this.state.hover ? styles.activeOption : null
    );

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={style}
        onMouseEnter={() => this.setState({hover: true})}
        onMouseLeave={() => this.setState({hover: false})}
        onPress={() => this.props.onClick(this.props.optionLabel)}>
        <Text style={styles.choice}>{`${this.props.optionLabel}.`}</Text>
        <Image source={this.props.optionImage} />
        <View style={{flex: 1}} />
      </TouchableOpacity>
    );
  }
}

export default Option;

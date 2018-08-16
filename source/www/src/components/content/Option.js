// @flow

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Image from '../common/AutoSizeImage';
import {ButtonHoverContextProvider} from '../context/buttonhover.context';
import Colors from '../../utils/colors';

type OptionType = 'A' | 'B' | 'C' | 'D';

type Props = {
  optionLabel: OptionType,
  optionImage: Image,
  onClick: (selectedOption: OptionType) => void,
  active: boolean,
};

const styles = {
  wrapperOption: {flexDirection: 'row', paddingHorizontal: 8, paddingVertical: 2},
  focusOption: {borderWidth: 2, borderColor: Colors.white},
  activeOption: {borderWidth: 2, borderColor: Colors.yellow},
  choice: {color: Colors.white, fontSize: 24},
};

class Option extends Component<Props> {
  render() {
    const style = Object.assign(
      {},
      styles.wrapperOption,
      this.props.active ? styles.activeOption : null,
    );

    return (
      <ButtonHoverContextProvider
        style={style}
        focusStyle={styles.focusOption}
        onPress={() => this.props.onClick(this.props.optionLabel)}>
        <Text style={styles.choice}>{`${this.props.optionLabel}.`}</Text>
        <Image source={this.props.optionImage} />
        <View style={{flex: 1}} />
      </ButtonHoverContextProvider>
    );
  }
}

export default Option;

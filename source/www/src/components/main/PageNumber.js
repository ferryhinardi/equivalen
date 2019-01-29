// @flow
import React, { Component } from 'react';
import { Text } from 'react-native';
import { ButtonHoverContextProvider } from '../context/buttonhover.context';
import type { ParamAnswer } from '../types.shared';
import Colors from '../../utils/colors';

type Props = ParamAnswer & {
  isSelected: boolean,
  onMoveNumber: (number: number) => void,
};

const styles = {
  wrapperNumber: {
    flexDirection: 'row',
    width: 50,
    padding: 4,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftColor: '#1EA684',
    borderRightColor: '#1EA684',
    borderBottomColor: '#1EA684',
    backgroundColor: '#DCECE7',
  },
  text: {
    color: Colors.black,
    fontSize: 12,
  },
};

class PageNumber extends Component<Props> {
  onPageNumberClick = (no) => {
    const page = parseInt(no, 10);
    this.props.onMoveNumber(page);
  };

  render() {
    const { no, answer, isDoubt, correct, isSelected } = this.props;
    let style = styles.wrapperNumber;
    let styleText = isSelected ? { ...styles.text, color: Colors.white } : styles.text;

    if (isSelected) {
      style = {
        ...style,
        backgroundColor: Colors.mainBackground,
      };
    }

    if (isDoubt) {
      style = {
        ...style,
        backgroundColor: Colors.doubt,
      };
    }

    if (typeof correct !== 'undefined') {
      if (correct) {
        style = {
          ...style,
          backgroundColor: Colors.green,
        };
        styleText = {
          ...styleText,
          color: Colors.black,
        };
      } else {
        style = {
          ...style,
          backgroundColor: Colors.red,
        };
        styleText = {
          ...styleText,
          color: Colors.white,
        };
      }
    }

    return (
      <ButtonHoverContextProvider
        onPress={() => this.onPageNumberClick(no)}
        focusStyle={{}}
        style={style}>
        <Text style={styleText}>{`${no}. ${answer}`}</Text>
      </ButtonHoverContextProvider>
    );
  }
}

export default PageNumber;

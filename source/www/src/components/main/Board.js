// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import get from 'lodash/get';
import { Text } from '../common';
import Option from './Option';
import Colors from '../../utils/colors';
import { createMarkup } from '../../utils/string';
import type { Answer } from '../types.shared';

type Question = {
  orderNo: number,
  question: {
    id: string,
    content: string,
    options: Array<{
      id: string,
      content: string,
      option: {
        name: string,
      },
    }>
  },
};
type Props = {
  questions: { [key: string]: Question },
  activeNo: number,
  onSetAnswer: (number: number, option: Answer) => void,
};
type State = {
  optionSelected?: Answer,
};

const styles = {
  container: {
    margin: 8,
    padding: 16,
    borderWidth: 3,
    borderColor: Colors.white,
    flex: 1,
    zIndex: -1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflowX: 'scroll',
    width: '98%',
  },
  text: {
    color: Colors.white,
    fontSize: 18,
  },
  content: {
    flex: 1,
    paddingHorizontal: 8,
  },
};

class Board extends Component<Props, State> {
  state = {
    optionSelected: null,
  };

  onOptionSelected = (option: Answer) => {
    this.setState({ optionSelected: option });

    this.props.onSetAnswer(option);
  };

  render() {
    const { questions, activeNo } = this.props;
    const question = get(questions, `${activeNo}`, {});
    const orderNo = get(question, 'orderNo', '0');
    const questionText = get(question, 'question.content', '');
    const options = get(question, 'question.options', []);

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{`${orderNo}.`}</Text>
        <View style={styles.content}>
          <Text style={styles.text}>
            <div dangerouslySetInnerHTML={createMarkup(questionText)} />
          </Text>
          {options.map(({ id, content, option }) => {
            const selected = this.state.optionSelected === option.name;

            return (
              <Option
                key={id}
                active={selected}
                optionLabel={option.name}
                optionContent={createMarkup(content)}
                onClick={this.onOptionSelected}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

export default Board;

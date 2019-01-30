// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';
import { Text, Loading } from '../common';
import Option from './Option';
import Colors from '../../utils/colors';
import type { Answer, ParamAnswer } from '../types.shared';
import { createMarkup } from '../../utils/string';

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
  archiveId: string,
  answers: {
    [key: string]: ParamAnswer,
  },
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

const MUTATION_SAVE_ANSWER = gql`
  mutation SaveUserAnswer($userAnswer: UserAnswerInput) {
    saveUserAnswer(userAnswer: $userAnswer) {
      orderNo
      answer
    }
  }
`;

class Board extends Component<Props, State> {
  state = {
    optionSelected: null,
  };

  onOptionSelected = (option: Answer, questionId: string, orderNo: number, mutate: Promise<any>) => {
    const { archiveId } = this.props;

    this.setState({ optionSelected: option }, () => {
      const variables = {
        userAnswer: {
          archiveId,
          question: { id: questionId },
          orderNo,
          answer: option,
        },
      };

      mutate({ variables }).then(() => {
        this.props.onSetAnswer(option);
      });
    });
  };

  render() {
    const { questions, activeNo } = this.props;
    const question = get(questions, `${activeNo}`, {});
    const orderNo = get(question, 'orderNo', '0');
    const questionId = get(question, 'question.id', '');
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
            const selected = get(this.props, `answers.${orderNo}.answer`) === option.name;

            return (
              <Mutation key={id} mutation={MUTATION_SAVE_ANSWER}>
                {(mutate, { loading }) => (
                  <React.Fragment>
                    {loading && <Loading type="equivalen" color="green" transparent />}
                    <Option
                      key={id}
                      active={selected}
                      optionLabel={option.name}
                      optionContent={createMarkup(content)}
                      onClick={(option) => this.onOptionSelected(option, questionId, orderNo, mutate)}
                    />
                  </React.Fragment>
                )}
              </Mutation>
            );
          })}
        </View>
      </View>
    );
  }
}

export default Board;

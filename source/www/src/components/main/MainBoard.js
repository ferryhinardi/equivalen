// @flow

import React, { Component } from 'react';
import get from 'lodash/get';
import HeaderBoard from './HeaderBoard';
import Board from './Board';
import FooterBoard from './FooterBoard';
import PageNumberList from './PageNumberList';
import { Loading } from '../common';
import type { QuestionV2, Answer, ParamAnswer } from '../types.shared';
import { setPageList } from '../../utils/pageNumber';
import { convertArrToObj } from '../../utils/convertArray';

type Props = {
  logo: string,
  requestGenerateRandQuestion: Promise<any>,
  loadingGenerate: boolean,
};

type State = {
  totalQuestion: number,
  questions: {
    [key: string]: QuestionV2,
  },
  answers: {
    [key: string]: ParamAnswer,
  },
  loadingCollectData: boolean,
  activeNo: number,
};

class MainBoard extends Component<Props, State> {
  state = {
    activeNo: 1,
    totalQuestion: 0,
    questions: {},
    answers: {},
    loadingCollectData: false,
  };

  componentDidMount() {
    this.setState({ loadingCollectData: true }, () => {
      this.props
        .requestGenerateRandQuestion()
        .then(({ data }) => {
          const questions = get(data, 'generateRandomQuestion', []);

          this.setState({
            totalQuestion: questions.length,
            questions: convertArrToObj(questions, 'orderNo'),
            loadingCollectData: false,
          });
        });
    });
  }

  onNextNumber = () => {
    const activeNo = this.state.activeNo + 1;

    if (activeNo <= this.state.totalQuestion) {
      this.setState({ activeNo });
    }
  };

  onPrevNumber = () => {
    const activeNo = this.state.activeNo - 1;

    if (activeNo > 0) {
      this.setState({ activeNo });
    }
  };

  onMoveNumber = (number: number) => {
    if (number > 0 && number <= this.state.totalQuestion) {
      this.setState({ activeNo: number });
    }
  };

  onSetAnswer = (option: Answer) => {
    const { answers, activeNo } = this.state;
    const currentAns = answers[activeNo] || {};
    currentAns.answer = option;

    this.setState({
      answers: {
        ...answers,
        [activeNo]: currentAns,
      },
    });
  };

  onSetDoubtAnswer = () => {
    const { answers, activeNo } = this.state;
    const currentAns = answers[activeNo] || {};
    currentAns.isDoubt = true;

    this.setState({
      answers: {
        ...answers,
        [activeNo]: currentAns,
      },
    });
  };

  render() {
    const { loadingGenerate } = this.props;
    const { questions, totalQuestion, answers, activeNo, loadingCollectData } = this.state;
    const loading = loadingGenerate && loadingCollectData;
    const dataPageList = setPageList(totalQuestion, answers);

    return (
      <React.Fragment>
        <HeaderBoard logo={this.props.logo} />
        {loading ? (
          <Loading type="equivalen" />
        ) : (
          <Board
            questions={questions}
            activeNo={activeNo}
            onSetAnswer={this.onSetAnswer}
          />
        )}
        <PageNumberList
          data={dataPageList}
          activeNo={activeNo}
          onMoveNumber={this.onMoveNumber}
        />
        <FooterBoard
          onNextNumber={this.onNextNumber}
          onPrevNumber={this.onPrevNumber}
          onSetDoubtAnswer={this.onSetDoubtAnswer}
        />
      </React.Fragment>
    );
  }
}

export default MainBoard;

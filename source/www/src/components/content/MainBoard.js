// @flow

import React, {Component} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';
import { PathConsumer } from '../context/path.context';
import mainAction from '../../actions/main';
import Image from '../common/AutoSizeImage';
import Option from './Option';
import type { MatPel, Answer, MappingAnswer, ParamAnswer, DataQuestion } from '../types.shared';

type Props = {
  page?: number,
  matpel: MatPel,
  to: number,
  answers: MappingAnswer,
  dataQuestion?: DataQuestion,
  mainActionCreator?: Object,
};

const styles = {
  wrapperQuestionAnswer: { flex: 1 },
};

const mapStateToProps = state => {
  const { currentMatpel, userLessonData } = state.main;
  const { dataQuestion } = userLessonData[currentMatpel];

  return { dataQuestion };
};

const mapDispatchToProps = dispatch => ({
  mainActionCreator: bindActionCreators(mainAction, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class MainBoard extends Component<Props> {
  onSelectedOption = (option: Answer) => {
    const { page = 1 } = this.props;
    this.setAnswer({ no: page, answer: option });
  };

  setAnswer = ({ no, answer }: ParamAnswer) => {
    this.props.mainActionCreator &&
      this.props.mainActionCreator.setAnswerAction({
        no,
        answer,
      });
  };

  render() {
    const { matpel, dataQuestion = {}, page = 1, answers } = this.props;
    const { to, page: number } = dataQuestion[page];
    const currentOption = R.path([page, 'answer'], answers);

    return (
      <PathConsumer>
        {({ paths }) => {
          const questionImages = `${paths.image}/tryouts/${matpel}/${to}-soal-jawab/${number}-soal.png`;
          const optionA = `${paths.image}/tryouts/${matpel}/${to}-soal-jawab/${number}-a.png`;
          const optionB = `${paths.image}/tryouts/${matpel}/${to}-soal-jawab/${number}-b.png`;
          const optionC = `${paths.image}/tryouts/${matpel}/${to}-soal-jawab/${number}-c.png`;
          const optionD = `${paths.image}/tryouts/${matpel}/${to}-soal-jawab/${number}-d.png`;

          return (
            <View style={styles.wrapperQuestionAnswer}>
              <Image source={questionImages} />
              <Option
                active={currentOption === 'A'}
                optionLabel={'A'}
                optionImage={optionA}
                onClick={this.onSelectedOption}
              />
              <Option
                active={currentOption === 'B'}
                optionLabel={'B'}
                optionImage={optionB}
                onClick={this.onSelectedOption}
              />
              <Option
                active={currentOption === 'C'}
                optionLabel={'C'}
                optionImage={optionC}
                onClick={this.onSelectedOption}
              />
              <Option
                active={currentOption === 'D'}
                optionLabel={'D'}
                optionImage={optionD}
                onClick={this.onSelectedOption}
              />
            </View>
          );
        }}
      </PathConsumer>
    );
  }
}

export default MainBoard;

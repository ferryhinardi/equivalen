// @flow

import React, {Component} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Image from '../common/AutoSizeImage';
import Option from './Option';
import type { MatPel, Answer, MappingAnswer, ParamAnswer, DataQuestion } from '../types.shared';

type Props = {
  page?: number,
  matpel: MatPel,
  to: number,
  setAnswer: (params: ParamAnswer) => void,
  answers: MappingAnswer,
  dataQuestion: DataQuestion,
};

const styles = {
  wrapperQuestionAnswer: { flex: 1 },
};

const mapStateToProps = (state) => ({
  dataQuestion: state.main.dataQuestion,
});

@connect(mapStateToProps)
class MainBoard extends Component<Props> {
  onSelectedOption = (option: Answer) => {
    const { page = 1 } = this.props;
    this.props.setAnswer({ no: page, answer: option });
  };

  render() {
    const { matpel, dataQuestion, page = 1 } = this.props;
    const { to, page: number } = dataQuestion[page];

    const questionImages = require(`../../images/assets_matpel/${matpel}/${to}-soal-jawab/${number}-soal.png`);
    const optionA = require(`../../images/assets_matpel/${matpel}/${to}-soal-jawab/${number}-a.png`);
    const optionB = require(`../../images/assets_matpel/${matpel}/${to}-soal-jawab/${number}-b.png`);
    const optionC = require(`../../images/assets_matpel/${matpel}/${to}-soal-jawab/${number}-c.png`);
    const optionD = require(`../../images/assets_matpel/${matpel}/${to}-soal-jawab/${number}-d.png`);

    return (
      <View style={styles.wrapperQuestionAnswer}>
        <Image source={questionImages} />
        <Option
          active={this.props.answers[page] === 'A'}
          optionLabel={'A'}
          optionImage={optionA}
          onClick={this.onSelectedOption}
        />
        <Option
          active={this.props.answers[page] === 'B'}
          optionLabel={'B'}
          optionImage={optionB}
          onClick={this.onSelectedOption}
        />
        <Option
          active={this.props.answers[page] === 'C'}
          optionLabel={'C'}
          optionImage={optionC}
          onClick={this.onSelectedOption}
        />
        <Option
          active={this.props.answers[page] === 'D'}
          optionLabel={'D'}
          optionImage={optionD}
          onClick={this.onSelectedOption}
        />
      </View>
    );
  }
}

export default MainBoard;

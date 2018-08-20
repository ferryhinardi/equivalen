// @flow

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Image from '../common/AutoSizeImage';
import Option from './Option';
import PageNumberList from './PageNumberList';
import {getStore} from '../../utils/store';
import Colors from '../../utils/colors';
import {setPageList} from '../../utils/pageNumber';
import data from '../../data';
import type {History, MatPel, Answer, ParamAnswer} from '../types.shared';

type Props = {
  history: History,
  matpel: MatPel,
  to: number,
};
type State = {
  answers: {
    [no: number]: Answer,
  },
  lessonData: Object,
  loading: boolean,
};

const styles = {
  container: {
    margin: 8,
    padding: 16,
    borderWidth: 3,
    borderColor: Colors.white,
    flex: 1,
    flexDirection: 'row',
    overflowX: 'hidden',
    zIndex: -1,
  },
  bullet: {
    color: Colors.white,
    fontSize: 24,
  },
  wrapperQuestionAnswer: {flex: 8},
};

class ContentMain extends Component<Props, State> {
  state = {
    answers: {},
    lessonData: {},
    loading: true,
  };

  async componentDidMount() {
    getStore(
      'matpel',
      (matpel) => this.setState({lessonData: data[matpel], loading: false})
    );
  }

  setAnswer = ({no, answer}: ParamAnswer) => {
    this.setState({
      answers: {...this.state.answers, [no]: answer},
    });
  };

  onSelectedOption = (option: Answer) => {
    const {page = 1} = this.props.history.getCurrentState();
    this.setAnswer({no: page, answer: option});
  };

  render() {
    const {matpel, to} = this.props;
    const {page = 1} = this.props.history.getCurrentState();

    const questionImages = require(`../../images/assets_matpel/${matpel}/${to}-soal-jawab/${page}-soal.png`);
    const optionA = require(`../../images/assets_matpel/${matpel}/${to}-soal-jawab/${page}-a.png`);
    const optionB = require(`../../images/assets_matpel/${matpel}/${to}-soal-jawab/${page}-b.png`);
    const optionC = require(`../../images/assets_matpel/${matpel}/${to}-soal-jawab/${page}-c.png`);
    const optionD = require(`../../images/assets_matpel/${matpel}/${to}-soal-jawab/${page}-d.png`);

    return (
      <View style={styles.container}>
        <Text style={styles.bullet}>{`${page}.`}</Text>
        <View style={styles.wrapperQuestionAnswer}>
          <Image source={questionImages} />
          <Option
            active={this.state.answers[page] === 'A'}
            optionLabel={'A'}
            optionImage={optionA}
            onClick={this.onSelectedOption}
          />
          <Option
            active={this.state.answers[page] === 'B'}
            optionLabel={'B'}
            optionImage={optionB}
            onClick={this.onSelectedOption}
          />
          <Option
            active={this.state.answers[page] === 'C'}
            optionLabel={'C'}
            optionImage={optionC}
            onClick={this.onSelectedOption}
          />
          <Option
            active={this.state.answers[page] === 'D'}
            optionLabel={'D'}
            optionImage={optionD}
            onClick={this.onSelectedOption}
          />
        </View>
        {!this.state.loading && (
          <PageNumberList data={setPageList(this.state.lessonData.totalSoal, this.state.answers)} />
        )}
      </View>
    );
  }
}

export default ContentMain;

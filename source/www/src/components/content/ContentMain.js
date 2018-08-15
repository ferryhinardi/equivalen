// @flow

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Image from '../common/AutoSizeImage';
import Option from './Option';
import Colors from '../../utils/colors';
import type {History, MatPel} from '../types.shared';

type Props = {
  history: History,
  matpel: MatPel,
  to: number,
};
type State = {
  selectedOption?: string,
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
  wrapperQuestionAnswer: {width: '98%'},
};

class ContentMain extends Component<Props, State> {
  state = {
    selectedOption: '',
  };

  onSelectedOption = (option: 'A' | 'B' | 'C' | 'D') => {
    this.setState({selectedOption: option});
  };

  render() {
    const {matpel, to} = this.props;
    const {page = 1} = this.props.history.getCurrentState();

    const questionImages = require(`../../images/data_matpel_encode/${matpel}/${to}-soal-jawab/${page}-soal.png`);
    const optionA = require(`../../images/data_matpel_encode/${matpel}/${to}-soal-jawab/${page}-a.png`);
    const optionB = require(`../../images/data_matpel_encode/${matpel}/${to}-soal-jawab/${page}-b.png`);
    const optionC = require(`../../images/data_matpel_encode/${matpel}/${to}-soal-jawab/${page}-c.png`);
    const optionD = require(`../../images/data_matpel_encode/${matpel}/${to}-soal-jawab/${page}-d.png`);

    return (
      <View style={styles.container}>
        <Text style={styles.bullet}>{`${page}.`}</Text>
        <View style={styles.wrapperQuestionAnswer}>
          <Image source={questionImages} />
          <Option
            active={this.state.selectedOption === 'A'}
            optionLabel={'A'}
            optionImage={optionA}
            onClick={this.onSelectedOption}
          />
          <Option
            active={this.state.selectedOption === 'B'}
            optionLabel={'B'}
            optionImage={optionB}
            onClick={this.onSelectedOption}
          />
          <Option
            active={this.state.selectedOption === 'C'}
            optionLabel={'C'}
            optionImage={optionC}
            onClick={this.onSelectedOption}
          />
          <Option
            active={this.state.selectedOption === 'D'}
            optionLabel={'D'}
            optionImage={optionD}
            onClick={this.onSelectedOption}
          />
        </View>
      </View>
    );
  }
}

export default ContentMain;

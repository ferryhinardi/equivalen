// @flow

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Image from '../common/AutoSizeImage';
import Option from './Option';
import Colors from '../../utils/colors';

const question = require('../../images/data-matpel/bhsindo/1-soal-jawab/1-soal.png');
const optionA = require('../../images/data-matpel/bhsindo/1-soal-jawab/1-a.png');
const optionB = require('../../images/data-matpel/bhsindo/1-soal-jawab/1-b.png');
const optionC = require('../../images/data-matpel/bhsindo/1-soal-jawab/1-c.png');
const optionD = require('../../images/data-matpel/bhsindo/1-soal-jawab/1-d.png');

const styles = {
  container: {
    margin: 8,
    padding: 16,
    borderWidth: 3,
    borderColor: Colors.white,
    flex: 1,
    flexDirection: 'row',
    overflowX: 'hidden',
  },
  bullet: {
    color: Colors.white,
    fontSize: 24,
  },
  wrapperQuestionAnswer: {width: '98%'},
};

class ContentMain extends Component {
  onSelectedOption = (option: 'A' | 'B' | 'C' | 'D') => {
    console.log('option', option);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bullet}>1. </Text>
        <View style={styles.wrapperQuestionAnswer}>
          <Image source={question} />
          <Option optionLabel={'A'} optionImage={optionA} onClick={this.onSelectedOption} />
          <Option optionLabel={'B'} optionImage={optionB} onClick={this.onSelectedOption} />
          <Option optionLabel={'C'} optionImage={optionC} onClick={this.onSelectedOption} />
          <Option optionLabel={'D'} optionImage={optionD} onClick={this.onSelectedOption} />
        </View>
      </View>
    );
  }
}

export default ContentMain;

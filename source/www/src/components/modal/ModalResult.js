// @flow
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import R from 'ramda';
import isElectron from 'is-electron-renderer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import mainAction from '../../actions/main';
import { Modal, Divider } from '../common';
import { RouterContextConsumer } from '../context/router.context';
import { ButtonHoverContextProvider } from '../context/buttonhover.context';
import { setPageList } from '../../utils/pageNumber';
import Colors from '../../utils/colors';
import { secondsToTime } from '../../utils/timer';
import { validationAns, getSolutionAnswer } from '../../utils/correction';
import type { History, UserPickLesson, MappingAnswer, DataQuestion } from '../types.shared';
import data from '../../data';
import { DEFAULT_TIMER, MATPEL } from '../../constants';

type Props = {
  isOpen: boolean,
  time: number,
  userPickLesson: UserPickLesson,
  dataQuestion: DataQuestion,
  mainActionCreator?: Object,
  close?: Function,
};

type State = {
  isOpen: boolean,
  matpel: string,
  to: number,
  totalQuestion: number,
  result: number,
  correctAns: number,
  wrongAns: number,
  unAnswer: number,
  doubtAns: number,
  answers: MappingAnswer,
};

const styles = {
  content: {
    width: '40%',
    top: '50%',
    left: '50%',
    bottom: 'auto',
    right: 'auto',
    padding: 3,
    transform: 'translate(-50%, -50%)',
  },
  containerHeader: {
    backgroundColor: Colors.grey,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  headerText: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 20,
  },
  containerContent: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  contentText: {textAlign: 'center', paddingVertical: 10},
  resultText: {fontSize: 36, fontWeight: 'bold'},
  userAnswerText: {fontSize: 24, fontWeight: 'bold'},
  noteText: {paddingVertical: 8, fontSize: 16},
  footerContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonFooter: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 2,
  },
  buttonFooterFocus: {
    borderWidth: 1,
    borderColor: '#2699D0',
  },
};

const mapStateToProps = state => ({
  time: state.main.time,
  userPickLesson: state.main.userPickLesson,
  dataQuestion: state.main.dataQuestion,
});

const mapDispatchToProps = dispatch => ({
  mainActionCreator: bindActionCreators(mainAction, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ModalResult extends Component<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.isOpen !== prevState.isOpen && nextProps.isOpen) {
      const { matpel, answers } = nextProps.userPickLesson;
      const totalQuestion = R.pathOr(0, [matpel, 'totalQuestion'], data);
      const solution = getSolutionAnswer(
        data[matpel].answers,
        nextProps.dataQuestion,
      );
      const { correct, wrong, empty, doubt } = validationAns(solution, answers);

      return {
        correctAns: correct,
        wrongAns: wrong,
        unAnswer: empty,
        doubtAns: doubt,
        result: Math.floor((correct / totalQuestion) * 100),
      };
    }

    return null;
  }

  state = {
    isOpen: this.props.isOpen,
    matpel: this.props.userPickLesson.matpel,
    to: this.props.userPickLesson.to,
    answers: this.props.userPickLesson.answers,
    totalQuestion: 50,
    result: 0,
    correctAns: 0,
    wrongAns: 0,
    unAnswer: 0,
    doubtAns: 0,
  };

  onTryAgain = (history: History) => {
    this.props.close && this.props.close();
    this.props.mainActionCreator &&
      this.props.mainActionCreator.resetAnswerAction();

    this.props.mainActionCreator &&
      this.props.mainActionCreator.resetTimeAction();

    history.transitionTo('/main', { page: 1 });
  };

  onGotoTutorialPage = (history: History) => {
    this.props.close && this.props.close();

    this.props.mainActionCreator &&
      this.props.mainActionCreator.resetAnswerAction();

    history.transitionTo('/main', { mode: 'tutorial' });
  };

  onShowResultPdf = () => {
    if (isElectron) {
      const {
        matpel,
        to,
        answers,
        result,
        totalQuestion,
        correctAns,
        wrongAns,
        doubtAns,
        unAnswer,
      } = this.state;
      const durationWorking = secondsToTime(DEFAULT_TIMER - this.props.time);

      require('electron').ipcRenderer.send('show-result-pdf', {
        matpel: MATPEL.get(matpel),
        to: to === 0 ? 'Random Soal' : to,
        answers: setPageList(totalQuestion, answers),
        date: moment().format('LL'),
        totalQuestion,
        result,
        correctAns,
        wrongAns,
        doubtAns,
        unAnswer,
        duration: `${durationWorking.h}:${durationWorking.m}:${durationWorking.s}`,
      });
    }
  };

  onSaveCsv = () => {
    if (isElectron) {
      const {
        matpel,
        to,
        answers,
        result,
        totalQuestion,
        correctAns,
        wrongAns,
        doubtAns,
        unAnswer,
      } = this.state;
      const durationWorking = secondsToTime(DEFAULT_TIMER - this.props.time);

      require('electron').ipcRenderer.send('save-result-csv', {
        matpel: MATPEL.get(matpel),
        to: to === 0 ? 'Random Soal' : to,
        answers: setPageList(totalQuestion, answers),
        date: moment().format('LL'),
        totalQuestion,
        result,
        correctAns,
        wrongAns,
        doubtAns,
        unAnswer,
        duration: `${durationWorking.h}:${durationWorking.m}:${durationWorking.s}`,
      });
    }
  };

  render() {
    const {
      correctAns,
      totalQuestion,
      result,
      wrongAns,
      unAnswer,
    } = this.state;

    return (
      <Modal
        isOpen={this.props.isOpen}
        style={styles}
        ariaHideApp={false}>
        <View style={styles.containerHeader}>
          <Text style={styles.headerText}>Hasil Anda</Text>
        </View>
        <View style={styles.containerContent}>
          <Text style={[styles.contentText, styles.resultText]}>{result}</Text>
          <Text style={[styles.contentText, styles.userAnswerText]}>{`Jumlah Benar: ${correctAns}/${totalQuestion}`}</Text>
          <Text style={[styles.contentText, styles.userAnswerText]}>{`Jumlah Salah: ${wrongAns}/${totalQuestion}`}</Text>
          <Text style={[styles.contentText, styles.userAnswerText]}>{`Tidak Terjawab: ${unAnswer}/${totalQuestion}`}</Text>
          <Text style={[styles.contentText, styles.noteText]}>Jika Anda ingin mencoba lagi, silahkan klik tombol (Coba Lagi)</Text>
          <Text style={[styles.contentText, styles.noteText]}>Jika tidak, Anda dapat mengklik tombol (Pembahasan) untuk melihat pembahasan.</Text>
        </View>
        <Divider />
        <View style={styles.footerContainer}>
          <ButtonHoverContextProvider
            onPress={() => this.onSaveCsv()}
            focusStyle={styles.buttonFooterFocus}
            style={styles.buttonFooter}>
            <Text>Simpan Hasil</Text>
          </ButtonHoverContextProvider>
          <RouterContextConsumer>
            {({ history }) => (
              <ButtonHoverContextProvider
                onPress={() => this.onTryAgain(history)}
                focusStyle={styles.buttonFooterFocus}
                style={styles.buttonFooter}>
                <Text>Coba Lagi</Text>
              </ButtonHoverContextProvider>
            )}
          </RouterContextConsumer>
          <RouterContextConsumer>
            {({ history }) => (
              <ButtonHoverContextProvider
                onPress={() => this.onGotoTutorialPage(history)}
                focusStyle={styles.buttonFooterFocus}
                style={styles.buttonFooter}>
                <Text>Pembahasan</Text>
              </ButtonHoverContextProvider>
            )}
          </RouterContextConsumer>
        </View>
      </Modal>
    );
  }
}

export default ModalResult;

// @flow
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import isElectron from 'is-electron-renderer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import mainAction from '../../actions/main';
import { Modal, Divider } from '../common';
import { RouterContextConsumer } from '../context/router.context';
import { ButtonHoverContextProvider } from '../context/buttonhover.context';
import { setPageList } from '../../utils/pageNumber';
import Colors from '../../utils/colors';
import { secondsToTime } from '../../utils/timer';
import { validationAns, getSolutionAnswer } from '../../utils/correction';
import type { History, MatPel, MappingAnswer, DataQuestion } from '../types.shared';
import data from '../../data';
import { DEFAULT_TIMER, MATPEL } from '../../constants';

type Props = {
  time: number,
  userPickLesson: {
    matpel: MatPel,
    to: number,
    answers: MappingAnswer,
  },
  dataQuestion: DataQuestion,
  globalActionCreator?: Object,
  mainActionCreator?: Object,
  onStartResumeTimer: (reset?: boolean) => void,
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
  state = {
    isOpen: false,
    matpel: this.props.userPickLesson.matpel,
    to: this.props.userPickLesson.to,
    answers: this.props.userPickLesson.answers,
    totalQuestion: 50,
    result: 0,
    correctAns: 0,
    wrongAns: 0,
    unAnswer: 0,
  };

  componentDidMount() {
    const { matpel, answers } = this.props.userPickLesson;
    const totalQuestion = data[matpel].totalQuestion;
    const solution = getSolutionAnswer(
      data[matpel].answers,
      this.props.dataQuestion,
    );
    const { correct, wrong, empty } = validationAns(solution, answers);

    this.setState({
      isOpen: true,
      correctAns: correct,
      wrongAns: wrong,
      unAnswer: empty,
      result: Math.floor((correct / totalQuestion) * 100),
    });
  }

  onTryAgain = (history: History) => {
    this.setState({isOpen: false}, () => {
      this.props.mainActionCreator &&
        this.props.mainActionCreator.setAnswerAction({});
      this.props.onStartResumeTimer &&
        this.props.onStartResumeTimer(true);
      history.transitionTo('/main', { page: 1 });
    });
  };

  onGotoTutorialPage = (history: History) => {
    this.setState({isOpen: false}, () => {
      this.props.mainActionCreator &&
        this.props.mainActionCreator.setAnswerAction({});
      history.transitionTo('/main', { mode: 'tutorial' });
    });
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
        unAnswer,
      } = this.state;
      const durationWorking = secondsToTime(DEFAULT_TIMER - this.props.time);

      require('electron').ipcRenderer.send('show-result-pdf', {
        matpel: MATPEL.get(matpel),
        to: to === 0 ? 'Random Soal' : to,
        answers: setPageList(totalQuestion, answers),
        totalQuestion,
        result,
        correctAns,
        wrongAns,
        unAnswer,
        duration: `${durationWorking.h}:${durationWorking.m}:${durationWorking.s}`,
      });
    }
  };

  render() {
    const {
      isOpen,
      correctAns,
      totalQuestion,
      result,
      wrongAns,
      unAnswer,
    } = this.state;

    return (
      <Modal
        isOpen={isOpen}
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
            onPress={() => this.onShowResultPdf()}
            focusStyle={styles.buttonFooterFocus}
            style={styles.buttonFooter}>
            <Text>Lihat Hasil</Text>
          </ButtonHoverContextProvider>
          <RouterContextConsumer>
            {({history}) => (
              <ButtonHoverContextProvider
                onPress={() => this.onTryAgain(history)}
                focusStyle={styles.buttonFooterFocus}
                style={styles.buttonFooter}>
                <Text>Coba Lagi</Text>
              </ButtonHoverContextProvider>
            )}
          </RouterContextConsumer>
          <RouterContextConsumer>
            {({history}) => (
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

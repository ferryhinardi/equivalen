// @flow
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import isElectron from 'is-electron-renderer';
import { Modal, Divider, Loading } from '../common';
import { RouterContextConsumer } from '../context/router.context';
import { ButtonHoverContextProvider } from '../context/buttonhover.context';
import mainAction from '../../actions/main';
import Colors from '../../utils/colors';
import type { History } from '../types.shared';

type Props = {
  isOpen: boolean,
  mainActionCreator?: Object,
  time: number,
  close?: Function,
  mutateGetScore: Promise<any>,
  loadingMutate: boolean,
  archiveId: string,
  evaluation: 'Tugas' | 'Ujian' | 'Kisi - Kisi',
};

type State = {
  open: boolean,
  loading: boolean,
  totalQuestion: number,
  score: number,
  totalCorrect: number,
  totalIncorrect: number,
  totalUnanswer: number,
  totalDoubt: number,
  duration: number,
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
});

const mapDispatchToProps = dispatch => ({
  mainActionCreator: bindActionCreators(mainAction, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ModalResult extends Component<Props, State> {
  state = {
    open: false,
    loading: false,
    totalQuestion: 50,
    score: 0,
    totalCorrect: 0,
    totalIncorrect: 0,
    totalUnanswer: 0,
    totalDoubt: 0,
    duration: 0,
  };

  componentDidUpdate({ isOpen: prevIsOpen }) {
    const { isOpen } = this.props;

    if (prevIsOpen !== isOpen && isOpen) {
      const { archiveId, time } = this.props;
      const variables = { archiveId, duration: time };

      this.setState({ loading: true }, () => {
        this.props
          .mutateGetScore({ variables })
          .then(({ data }) => {
            const totalQuestion = get(data, 'collectScore.archive.totalQuestion', 0);
            const score = get(data, 'collectScore.score', 0);
            const totalCorrect = get(data, 'collectScore.totalCorrect', 0);
            const totalIncorrect = get(data, 'collectScore.totalIncorrect', 0);
            const totalUnanswer = get(data, 'collectScore.totalUnanswer', 0);
            const totalDoubt = get(data, 'collectScore.totalDoubt', 0);
            const duration = get(data, 'collectScore.duration', 0);

            this.setState({
              open: true,
              loading: false,
              totalQuestion,
              score,
              totalCorrect,
              totalIncorrect,
              totalUnanswer,
              totalDoubt,
              duration,
            });
          });
      });
    }
  }

  onQuit = (history: History) => {
    this.setState({ isOpen: false }, () => {
      this.props.mainActionCreator &&
        this.props.mainActionCreator.resetTimeAction();

      this.props.close && this.props.close();
      history.transitionTo('/main-menu');
    });
  };

  onShowResultPdf = () => {
    if (isElectron) {
      // const {
      //   score,
      //   totalQuestion,
      //   correctAns,
      //   wrongAns,
      //   doubtAns,
      //   unAnswer,
      // } = this.state;
      // const durationWorking = secondsToTime(DEFAULT_TIMER - this.props.time);

      require('electron').ipcRenderer.send('show-result-pdf', {});
    }
  };

  onSaveCsv = () => {
    if (isElectron) {
      // const {
      //   score,
      //   totalQuestion,
      //   correctAns,
      //   wrongAns,
      //   doubtAns,
      //   unAnswer,
      // } = this.state;
      // const durationWorking = secondsToTime(DEFAULT_TIMER - this.props.time);

      require('electron').ipcRenderer.send('save-result-csv', {});
    }
  };

  render() {
    const { evaluation } = this.props;
    const {
      open,
      loading,
      score,
      totalQuestion,
      totalCorrect,
      totalIncorrect,
      totalUnanswer,
    } = this.state;

    if (loading) {
      return <Loading type="equivalen" color="green" transparent />;
    }

    return (
      <Modal
        isOpen={open}
        style={styles}
        ariaHideApp={false}>
        <View style={styles.containerHeader}>
          <Text style={styles.headerText}>Hasil Anda</Text>
        </View>
        <View style={styles.containerContent}>
          <Text style={[styles.contentText, styles.resultText]}>{score}</Text>
          <Text style={[styles.contentText, styles.userAnswerText]}>{`Jumlah Benar: ${totalCorrect}/${totalQuestion}`}</Text>
          <Text style={[styles.contentText, styles.userAnswerText]}>{`Jumlah Salah: ${totalIncorrect}/${totalQuestion}`}</Text>
          <Text style={[styles.contentText, styles.userAnswerText]}>{`Tidak Terjawab: ${totalUnanswer}/${totalQuestion}`}</Text>
          <Text style={[styles.contentText, styles.noteText]}>Jika Anda ingin mencoba lagi, silahkan klik tombol (Coba Lagi)</Text>
          <Text style={[styles.contentText, styles.noteText]}>Jika tidak, Anda dapat mengklik tombol (Pembahasan) untuk melihat pembahasan.</Text>
        </View>
        <Divider />
        <View style={styles.footerContainer}>
          {evaluation === 'Kisi - Kisi' && (
            <ButtonHoverContextProvider
              onPress={() => this.onShowResultPdf()}
              focusStyle={styles.buttonFooterFocus}
              style={styles.buttonFooter}>
              <Text>Simpan Hasil</Text>
            </ButtonHoverContextProvider>
          )}
          <RouterContextConsumer>
            {({ history }) => (
              <ButtonHoverContextProvider
                onPress={() => this.onQuit(history)}
                focusStyle={styles.buttonFooterFocus}
                style={styles.buttonFooter}>
                <Text>Keluar</Text>
              </ButtonHoverContextProvider>
            )}
          </RouterContextConsumer>
          {/* <RouterContextConsumer>
            {({ history }) => (
              <ButtonHoverContextProvider
                onPress={() => this.onGotoTutorialPage(history)}
                focusStyle={styles.buttonFooterFocus}
                style={styles.buttonFooter}>
                <Text>Pembahasan</Text>
              </ButtonHoverContextProvider>
            )}
          </RouterContextConsumer> */}
        </View>
      </Modal>
    );
  }
}

export default ModalResult;

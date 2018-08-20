// @flow
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Modal, Divider} from '../common';
import isElectron from 'is-electron-renderer';
import {ButtonHoverContextProvider} from '../context/buttonhover.context';
import {getStore} from '../../utils/store';
import Colors from '../../utils/colors';
import {validationAns} from '../../utils/correction';
import data from '../../data';

type Props = {
  open: boolean,
};

type State = {
  totalQuestion: number,
  result: number,
  correctAns: number,
  wrongAns: number,
  unAnswer: number,
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

class ModalResult extends Component<Props, State> {
  static getDerivedStateFromProps(nextProps: Props) {
    if (nextProps.open) {
      getStore(['matpel', 'to', 'answer'], (results) => {
        let {answer} = results;
        const {matpel, to} = results;
        const indexSolutionAns = to - 1;
        const solution = data[matpel].answers[indexSolutionAns];
        const totalQuestion = data[matpel].totalSoal;

        if (!isElectron) {
          answer = JSON.parse(answer);
        }

        const {correct, wrong, empty} = validationAns(solution, answer);

        return ({
          totalQuestion,
          correctAns: correct,
          wrongAns: wrong,
          unAnswer: empty,
          result: Math.floor((correct / totalQuestion) * 100),
        });
      })
    }
  }

  state = {
    totalQuestion: 50,
    result: 0,
    correctAns: 0,
    wrongAns: 0,
    unAnswer: 0,
  };

  render() {
    const {correctAns, totalQuestion, result, wrongAns, unAnswer} = this.state;
    return (
      <Modal
        isOpen={this.props.open}
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
          <ButtonHoverContextProvider focusStyle={styles.buttonFooterFocus} style={styles.buttonFooter}>
            <Text>Lihat Hasil</Text>
          </ButtonHoverContextProvider>
          <ButtonHoverContextProvider focusStyle={styles.buttonFooterFocus} style={styles.buttonFooter}>
            <Text>Coba Lagi</Text>
          </ButtonHoverContextProvider>
          <ButtonHoverContextProvider focusStyle={styles.buttonFooterFocus} style={styles.buttonFooter}>
            <Text>Pembahasan</Text>
          </ButtonHoverContextProvider>
        </View>
      </Modal>
    );
  }
}

export default ModalResult;

// @flow
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Modal, Divider } from '../common';
import { ButtonHoverContextProvider } from '../context/buttonhover.context';
import Colors from '../../utils/colors';

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
  contentText: { textAlign: 'center', paddingVertical: 10, fontSize: 16 },
  footerContainer: {
    marginTop: 8,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'flex-end',
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
  boldContent: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  redBoldContent: {
    color: Colors.red,
    fontSize: 24,
  },
  brownBoldContent: {
    color: Colors.doubt,
    fontSize: 24,
  },
};

const ContentAllAnswered = (
  <View>
    <Text style={[styles.contentText, styles.boldContent]}>Apakah Anda sudah yakin dengan seluruh jawaban anda?</Text>
    <Text style={styles.contentText}>Jika Anda ingin melanjutkan, silakan klik tombol (Kembail)</Text>
    <Text style={styles.contentText}>Jika tidak, Anda dapat mengklik tombol (Selesai) untuk melihat hasil</Text>
  </View>
);

type PropsContentHasUnanswer = {
  totalUnAnswer: number,
  totalDoubtAnswer: number,
};
const ContentHasUnanswer = (props: PropsContentHasUnanswer) => (
  <View>
    <Text style={[styles.contentText, styles.boldContent]}>Soal Anda masih ada yang belum terjawab!</Text>
    <Text style={[styles.contentText, styles.boldContent, styles.redBoldContent]}>{props.totalUnAnswer} soal belum dijawab</Text>
    <Text style={[styles.contentText, styles.boldContent, styles.brownBoldContent]}>{props.totalDoubtAnswer} soal ragu-ragu</Text>
    <Text style={[styles.contentText, styles.boldContent]}>Apakah Anda ingin menjawab dan kembali ke halaman soal tersebut?</Text>
    <Text style={styles.contentText}>Jika Anda ingin melanjutkan, silakan klik tombol (Kembail)</Text>
    <Text style={styles.contentText}>Jika tidak, Anda dapat mengklik tombol (Selesai) untuk melihat hasil</Text>
  </View>
);

type Props = {
  isOpen: boolean,
  totalUnAnswer: number,
  totalDoubtAnswer: number,
  closeModal?: () => void,
  onTimeOut?: () => void,
  setVisibleModalResult?: (visible: boolean) => void,
};

class ModalConfirmationFinish extends Component<Props> {
  render() {
    const { totalUnAnswer, totalDoubtAnswer } = this.props;
    const showConfirmationForAllAnswered = totalUnAnswer === 0 && totalDoubtAnswer === 0;

    return (
      <Modal
        isOpen={this.props.isOpen}
        style={styles}
        ariaHideApp={false}>
        <View style={styles.containerHeader}>
          <Text style={styles.headerText}>Konfirmasi</Text>
        </View>
        <View style={styles.containerContent}>
          {showConfirmationForAllAnswered ?
            ContentAllAnswered :
            <ContentHasUnanswer
              totalUnAnswer={totalUnAnswer}
              totalDoubtAnswer={totalDoubtAnswer}
            />
          }
        </View>
        <Divider />
        <View style={styles.footerContainer}>
          <ButtonHoverContextProvider
            onPress={() => {
              this.props.closeModal && this.props.closeModal();
            }}
            focusStyle={styles.buttonFooterFocus}
            style={styles.buttonFooter}>
            <Text>Kembali</Text>
          </ButtonHoverContextProvider>
          <ButtonHoverContextProvider
            onPress={() => {
              this.props.closeModal && this.props.closeModal();
              this.props.onTimeOut && this.props.onTimeOut();
              this.props.setVisibleModalResult && this.props.setVisibleModalResult(true);
            }}
            focusStyle={styles.buttonFooterFocus}
            style={styles.buttonFooter}>
            <Text>Selesai</Text>
          </ButtonHoverContextProvider>
        </View>
      </Modal>
    );
  }
}

export default ModalConfirmationFinish;

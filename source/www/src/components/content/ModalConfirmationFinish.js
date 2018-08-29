// @flow
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Modal, Divider} from '../common';
import {ButtonHoverContextProvider} from '../context/buttonhover.context';
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
  contentText: {textAlign: 'center', paddingVertical: 10, fontSize: 16},
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
};

const ContentAllAnswered = (
  <View>
    <Text style={[styles.contentText, styles.boldContent]}>Apakah Anda sudah yakin dengan seluruh jawaban anda?</Text>
    <Text style={styles.contentText}>Jika Anda ingin melanjutkan, silakan klik tombol (Kembail)</Text>
    <Text style={styles.contentText}>Jika tidak, Anda dapat mengklik tombol (Selesai) untuk melihat hasil</Text>
  </View>
);

const ContentHasUnanswer = () => (
  <View>
    <Text style={[styles.contentText, styles.boldContent]}>Soal Anda masih ada yang belum terjawab!</Text>
    <Text style={[styles.contentText, styles.boldContent, styles.redBoldContent]}>50 soal belum dijawab</Text>
    <Text style={[styles.contentText, styles.boldContent]}>Apakah Anda ingin menjawab dan kembali ke halaman soal tersebut?</Text>
    <Text style={styles.contentText}>Jika Anda ingin melanjutkan, silakan klik tombol (Kembail)</Text>
    <Text style={styles.contentText}>Jika tidak, Anda dapat mengklik tombol (Selesai) untuk melihat hasil</Text>
  </View>
);

type Props = {
  isOpen: boolean,
  totalUnAnswer: number,
  closeModal?: () => void,
};

class ModalConfirmationFinish extends Component<Props> {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        style={styles}
        ariaHideApp={false}>
        <View style={styles.containerHeader}>
          <Text style={styles.headerText}>Konfirmasi</Text>
        </View>
        <View style={styles.containerContent}>
          {this.props.totalUnAnswer ? ContentAllAnswered : <ContentHasUnanswer totalUnAnswer={this.props.totalUnAnswer} />}
        </View>
        <Divider />
        <View style={styles.footerContainer}>
          <ButtonHoverContextProvider
            onPress={() => {
              this.props.closeModal && this.props.closeModal();
            }}
            focusStyle={styles.buttonFooterFocus}
            style={styles.buttonFooter}>
            <Text>Kembail</Text>
          </ButtonHoverContextProvider>
          <ButtonHoverContextProvider
            onPress={() => {}}
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

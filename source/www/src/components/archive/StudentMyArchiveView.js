// @flow

import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import get from 'lodash/get';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { Text, ButtonRouter } from '../common';
import Colors from '../../utils/colors';
import type { History } from '../types.shared';

type Props = {
  name: string,
  id: string,
  assignment?: {
    deadline: string,
  },
  evaluation: {
    type: string,
  },
  questionType: {
    name: string,
  },
  packages: Array<{
    name: string,
    totalQuestion: number,
  }>,
  createdAt: string,
};

const styles = {
  container: {
    padding: 8,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  containerSubtitle: {
    flexDirection: 'column',
    flex: 1,
  },
  titleText: {
    fontSize: 24,
    color: Colors.black,
  },
  wrapperSubtitle: {
    flexDirection: 'row',
  },
  subtitleText: {
    flex: 1,
    fontStyle: 'italic',
    textTransform: 'uppercase',
  },
  wrapperIcon: {
    flexDirection: 'row',
    paddingVertical: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 16,
  },
  downloadButton: {
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerQuote: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
};

export const HeaderAssignment = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerQuote}>
      Jangan lupa bersyukur ya teman, karena kamu bisa ngerjain tugas kapan aja, di mana aja, tanpa ribet!
    </Text>
  </View>
);

class MyArchiveView extends Component<Props> {
  onRedirectToQuestion = (history: History, id: string, name: string) => {
    history.transitionTo('/question', { packageId: id, packageName: name });
  };

  render() {
    const { id, name } = this.props;
    const deadline = get(this.props, 'assignment.deadline');
    const deadlineDate = deadline ? moment(deadline).format('DD-MMM-YY hh:mm') : '';

    return (
      <View style={styles.container}>
        <View style={styles.containerSubtitle}>
          <ButtonRouter onPress={(history: History) => this.onRedirectToQuestion(history, id, name)}>
            <Text style={styles.titleText}>{name}</Text>
          </ButtonRouter>
          <View style={styles.wrapperSubtitle}>
            <Text style={styles.subtitleText}>{`BATAS PENGUMPULAN TUGAS: ${deadlineDate}`}</Text>
          </View>
        </View>
        <View style={styles.wrapperIcon}>
          <TouchableOpacity style={styles.downloadButton}>
            <FontAwesomeIcon icon={faDownload} color={Colors.black} size="lg" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default MyArchiveView;

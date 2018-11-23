// @flow

import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { Text, Image } from '../common';
import Colors from '../../utils/colors';

type Props = {
  packageName: string,
  id: number,
  curriculumName: string,
  totalQuestion: string,
  createdAt: string,
};

const styles = {
  container: {
    padding: 8,
    width: '90%',
    alignSelf: 'center',
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
  },
  iconButton: {
    marginHorizontal: 16,
  },
};

const printIcon = require('../../images/assets/icon-print.png');
const shareIcon = require('../../images/assets/icon-share.png');
const viewIcon = require('../../images/assets/icon-view.png');

class MyArchiveView extends Component<Props> {
  render() {
    const { packageName, createdAt, curriculumName, totalQuestion } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{packageName}</Text>
        <View style={styles.wrapperSubtitle}>
          <Text style={styles.subtitleText}>{`DIBUAT: ${moment(createdAt).format('DD-MMM-YY')}`}</Text>
          <Text style={styles.subtitleText}>{curriculumName}</Text>
          <Text style={styles.subtitleText}>{totalQuestion}</Text>
        </View>
        <View style={styles.wrapperIcon}>
          <TouchableOpacity>
            <Image source={printIcon} size={40} style={styles.iconButton} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={shareIcon} size={40} style={styles.iconButton} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={viewIcon} size={40} style={styles.iconButton} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default MyArchiveView;

// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import get from 'lodash/get';
import { Text, Avatar } from '../common';
import Colors from '../../utils/colors';

type Props = {
  user: Object,
  target: Object,
};

const styles = {
  container: {
    flexDirection: 'row',
    paddingHorizontal: 32,
  },
  labelFullname: {
    fontSize: 16,
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
  wrapperIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonConfirmation: {
    backgroundColor: Colors.primary,
    padding: 8,
    marginHorizontal: 4,
  },
  buttonDelete: {
    backgroundColor: Colors.transparent,
    padding: 7,
    marginHorizontal: 4,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderStyle: 'solid',
  },
};

const studentButton = require('../../images/assets/student-avatar.png');

class RequestFollowerView extends Component<Props> {
  onConfirmation = () => {};

  render() {
    const { user: userStudent } = this.props;

    return (
      <View style={styles.container}>
        <Avatar type="square" size={50} source={studentButton} />
        <Text style={styles.labelFullname}>{get(userStudent, 'fullName', '')}</Text>
        <View style={styles.wrapperIcon}>
          <TouchableOpacity style={styles.buttonConfirmation} activeOpacity={.8}>
            <Text style={{ color: Colors.white }}>KONFIRMASI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDelete} activeOpacity={.8}>
            <Text style={{ color: Colors.primary }}>HAPUS</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default RequestFollowerView;

// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import moment from 'moment';
import get from 'lodash/get';
import { Text, RoleAvatar, Image } from '../common';
import { PathConsumer } from '../context/path.context';
import { getStore } from '../../utils/store';
import Colors from '../../utils/colors';

type Props = { user: Object };
type State = { username: ?string };

const studentButton = require('../../images/assets/student-menu.png');
const styles = {
  container: {
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 32,
  },
  subHeaderText: {
    color: Colors.red,
    fontStyle: 'italic',
  },
};

class ProfileTeacher extends Component<Props, State> {
  state = {
    username: null,
  };

  async componentDidMount() {
    const username = await getStore('username');

    this.setState({ username });
  }

  render() {
    const { user } = this.props;
    const joinAt = moment(get(user, 'createdAt')).format('MMM YYYY');

    return (
      <View style={styles.container}>
        <RoleAvatar
          type="square"
          size={150}
          source={studentButton}
          onClick={() => {}}
        />
        <Text style={styles.headerText}>{this.state.username || 'Username'}</Text>
        <Text style={styles.subHeaderText}>{`bergabung sejak: ${joinAt}`}</Text>
        <View style={{ paddingVertical: 30 }}>
          <PathConsumer>
            {({ paths }) => (
              <Image
                source={`${paths.image}/quotes-profile-murid.png`}
                size={50}
              />
            )}
          </PathConsumer>
        </View>
      </View>
    );
  }
}

export default ProfileTeacher;

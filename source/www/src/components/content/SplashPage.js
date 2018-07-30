// @flow

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Image, Text} from 'react-native';
import {Page} from '../common';
import Colors from '../../utils/colors';
import logo from '../../images/logo/react_256.png';

type Props = {
  history: object,
};

const styles = {
  image: {width: 100, height: 100},
  text: {color: Colors.white, textAlign: 'center'},
};

class SplashPage extends PureComponent<Props> {
  static contextTypes = {
    history: PropTypes.object,
  };

  componentDidMount() {
    setTimeout(() => {
      this.context.history.replace('/login');
    }, 3000);
  }

  render() {
    return (
      <Page backgroundColor={Colors.primary}>
        <Image source={logo} style={styles.image} />
        <Text style={styles.text}>Equivalent</Text>
      </Page>
    );
  }
}

export default SplashPage;

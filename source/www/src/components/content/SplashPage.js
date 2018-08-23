// @flow

import React, {PureComponent} from 'react';
import {Text} from 'react-native';
import {AppVersionConsumer} from '../context/appversion.context';
import {Page, Image} from '../common';
import Colors from '../../utils/colors';

type Props = {
  history: Object,
};

const logoSplash = require('../../images/assets/logo_splash.png');
const styles = {
  appVersion: {
    paddingVertical: 16,
    color: Colors.white,
    fontSize: 16,
  },
};

class SplashPage extends PureComponent<Props> {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.replace('/login');
    }, 3000);
  }

  render = () => (
    <Page backgroundColor={Colors.primary}>
      <Image source={logoSplash} size={50} />
      <AppVersionConsumer>
        {({appVersion}) => (
          <Text style={styles.appVersion}>{`Version: ${appVersion}`}</Text>
        )}
      </AppVersionConsumer>
    </Page>
  );
}

export default SplashPage;

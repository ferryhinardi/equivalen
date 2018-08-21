// @flow

import React, {PureComponent} from 'react';
import {Page, Image} from '../common';
import Colors from '../../utils/colors';

type Props = {
  history: Object,
};

const logoSplash = require('../../images/assets/logo_splash.png');

class SplashPage extends PureComponent<Props> {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.replace('/login');
    }, 3000);
  }

  render = () => (
    <Page backgroundColor={Colors.primary}>
      <Image source={logoSplash} size={50} />
    </Page>
  );
}

export default SplashPage;

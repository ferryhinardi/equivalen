// @flow

import React, {PureComponent} from 'react';
import {Image} from 'react-native';
import {Page} from '../common';
import Colors from '../../utils/colors';
import images from '../../images/assets_encode/images';

type Props = {
  history: Object,
};

const styles = {
  image: {
    width: 300,
    height: 200,
  },
};

class SplashPage extends PureComponent<Props> {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.replace('/login');
    }, 3000);
  }

  render() {
    return (
      <Page backgroundColor={Colors.primary}>
        <Image
          source={{
            uri: images.logo_splash,
          }}
          resizeMode="stretch"
          style={styles.image}
        />
      </Page>
    );
  }
}

export default SplashPage;

// @flow

import React, {Component} from 'react';
import {View, ImageBackground} from 'react-native';

type Props = {
  children: React$Node,
  backgroundColor?: string,
  backgroundImage?: any,
};

const styles = {
  body: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    maxWidth: 360,
  },
};

class Page extends Component<Props> {
  render() {
    const {children, backgroundColor, backgroundImage} = this.props;
    const style = Object.assign({}, styles.body, {backgroundColor});
    const Page = (
      <View style={style}>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    );

    return backgroundImage ? (
      <ImageBackground source={backgroundImage} imageStyle={{width: '100px', height: '100px'}}>
        {Page}
      </ImageBackground>
    ) : (
      Page
    );
  }
}

export default Page;

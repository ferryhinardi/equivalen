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
  imageBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

class Page extends Component<Props> {
  render() {
    const {children, backgroundColor, backgroundImage} = this.props;
    const style = Object.assign({}, styles.body, {backgroundColor});
    const Page = (
      <View style={styles.content}>
        {children}
      </View>
    );

    return backgroundImage ? (
      <ImageBackground
        source={backgroundImage}
        imageStyle={[styles.imageBackground, {resizeMode: 'cover'}]}
        style={style}
        resizeMode="cover">
        {Page}
      </ImageBackground>
    ) : (
      <View style={style}>
        {Page}
      </View>
    );
  }
}

export default Page;

// @flow

import React, {Component} from 'react';
import {View, ImageBackground} from 'react-native';

type Props = {
  children: React$Node,
  backgroundColor?: string,
  backgroundImage?: any,
  flexDirection?: 'row' | 'column',
  maxWidth?: number,
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
    height: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};

class Page extends Component<Props> {
  static defaultProps = {
    flexDirection: 'column',
    maxWidth: 360,
  };

  render() {
    const {
      children,
      backgroundColor,
      backgroundImage,
      flexDirection,
      maxWidth,
    } = this.props;
    const style = Object.assign({}, styles.body, { backgroundColor });
    const Page = backgroundImage ? (
      <ImageBackground
        source={backgroundImage}
        imageStyle={[styles.imageBackground, { resizeMode: 'cover' }]}
        style={styles.content}
        resizeMode="cover">
        {children}
      </ImageBackground>
    ) : (
      <View style={[styles.content, { flexDirection, maxWidth }]}>
        {children}
      </View>
    );

    return (
      <View style={style}>
        {Page}
      </View>
    );
  }
}

export default Page;

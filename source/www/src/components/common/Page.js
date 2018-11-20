// @flow

import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';

type Props = {
  children: React$Node,
  backgroundColor?: string,
  backgroundImage?: any,
  flexDirection?: 'row' | 'column',
  maxWidth?: number,
  minWidth?: number,
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
  isFullWidth?: boolean,
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
    zIndex: -1,
  },
  content: {
    height: '100%',
    padding: 8,
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
    justifyContent: 'center',
    maxWidth: 360,
    minWidth: 360,
  };

  render() {
    let { maxWidth, minWidth } = this.props;
    const {
      children,
      backgroundColor,
      backgroundImage,
      flexDirection,
      justifyContent,
      isFullWidth,
    } = this.props;
    let width = null;
    if (isFullWidth) {
      maxWidth = 'unset';
      minWidth = 'unset';
      width = '100%';
    }
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
      <View style={[styles.content, { flexDirection, maxWidth, minWidth, justifyContent, width }]}>
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

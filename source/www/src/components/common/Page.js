// @flow

import React, {Component} from 'react';
import {View, ImageBackground} from 'react-native';

type Props = {
  children: React$Node,
  backgroundColor?: string,
  backgroundImage?: any,
  flexDirection?: 'row' | 'column',
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
  };

  render() {
    const {children, backgroundColor, backgroundImage, flexDirection} = this.props;
    const style = Object.assign({}, styles.body, {backgroundColor});
    const Page = backgroundImage ? (
      <ImageBackground
        source={backgroundImage}
        imageStyle={[styles.imageBackground, {resizeMode: 'cover'}]}
        style={styles.content}
        resizeMode="cover">
        {children}
      </ImageBackground>
    ) : (
      <View style={[styles.content, {flexDirection}]}>
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

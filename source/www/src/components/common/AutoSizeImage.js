// @flow

import React, {Component} from 'react';
import {Image} from 'react-native';

type Props = {
  source: string | Object,
  resizeMode?: 'center' | 'contain' | 'cover' | 'none' | 'repeat' | 'stretch',
  style?: Object,
  size?: number,
};

type State = {
  width: ?number,
  height: ?number,
};

class AutoSizeImage extends Component<Props, State> {
  static defaultProps = {
    resizeMode: 'contain',
  };

  state = {
    width: null,
    height: null,
  };

  componentDidMount() {
    Image.getSize(this.props.source, (width, height) => {
      let widthSize = width;
      let heightSize = height;
      if (this.props.size) {
        const scale = this.props.size / 100;
        widthSize = widthSize * scale;
        heightSize = heightSize * scale;
      }

      this.setState({width: widthSize, height: heightSize});
    });
  }

  render() {
    const width = this.state.width;
    const height = this.state.height;
    const style = {
      ...this.props.style,
      width,
      height,
    };

    return (
      <Image
        {...this.props}
        style={style}
      />
    );
  }
}

export default AutoSizeImage;

import React, { Component } from 'react';

export default class StaticContent extends Component {
  state = {
    __html: '',
  };

  render() {
    return (
        <div dangerouslySetInnerHTML={this.state} />
    );
  }
}

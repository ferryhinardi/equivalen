import React, { Component } from "react";
import 'whatwg-fetch';

export default class StaticContent extends Component {
  state = {
    __html: '',
  };

  UNSAFE_componentWillMount() {
    fetch('/main')
      .then(resp => resp.text())
      .then(content => this.setState({__html: content}))
      .catch(err => console.error('err', err)) // eslint-disable-line
  }

  render() {
    return (
        <div dangerouslySetInnerHTML={this.state} />
    );
  }
}

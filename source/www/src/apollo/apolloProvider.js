// @flow

import React, { Component } from 'react';
import { ApolloProvider as ApolloProviderApollo } from 'react-apollo';
import createApolloClient from './apolloClient';
import { Loading } from '../components/common';

type Props = {
  children: React$Node,
};
type State = {
  client: any,
  loaded: boolean,
};

class ApolloProvider extends Component<Props, State> {
  state = {
    client: null,
    loaded: false,
  }

  async componentDidMount() {
    const client = await createApolloClient();

    this.setState({
      client,
      loaded: true,
    });
  }

  render() {
    return this.state.loaded ? (
      <ApolloProviderApollo client={this.state.client}>
        {this.props.children}
      </ApolloProviderApollo>
    ) : (
      <Loading />
    );
  }
}

export default ApolloProvider;

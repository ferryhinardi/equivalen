// @flow
import React, { Component } from 'react';
import {View} from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import R from 'ramda';
import {Loading} from '../common';
import {RouterContextConsumer} from '../context/router.context';
import AccountKitWeb from './AccountKitWeb';
import type { QueriesAccountKit } from '../types.shared';

const mutationAccountKit = gql`
  mutation GetPrefillViaAccountKit($code: String!) {
    getPrefillViaAccountKit(code:$code) {
      user {
        phoneNumber
      }
      token
    }
  }
`;

type Props = {};
type State = {loading: boolean};

class AccountKitPage extends Component<Props, State> {
  state = {
    loading: false,
  };

  render() {
    return (
      <RouterContextConsumer>
        {({history}) => (
          <Mutation
            update={(cache, { data: { getPrefillViaAccountKit } }) => {
              this.setState({ loading: false }, () => {
                const phoneNumber = R.pathOr('', ['user', 'phoneNumber'], getPrefillViaAccountKit);
                const token = R.propOr('', 'token', getPrefillViaAccountKit);

                history.transitionTo('/registration', {phoneNumber, token});
              });
            }}
            mutation={mutationAccountKit}>
            {(getPrefillViaAccountKit) => (
              <View>
                {this.state.loading && <Loading transparent />}
                <AccountKitWeb
                  debug={false}
                  onCallback={(params: ?QueriesAccountKit) => {
                    if (!params) {
                      return;
                    }

                    if (params.status === 'PARTIALLY_AUTHENTICATED') {
                      this.setState({ loading: true });
                      getPrefillViaAccountKit({ variables: { code: params.code } });
                    }
                  }}
                />
              </View>
            )}
          </Mutation>
        )}
      </RouterContextConsumer>
    );
  }
}

export default AccountKitPage;

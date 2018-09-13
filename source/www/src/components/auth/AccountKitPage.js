// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import R from 'ramda';
import isElectronRenderer from 'is-electron-renderer';
import { Loading } from '../common';
import { RouterContextConsumer } from '../context/router.context';
import AccountKitWeb from './AccountKitWeb';
import AccountKitElectron from './AccountKitElectron';
import type { QueriesAccountKit } from '../types.shared';
import { setStore } from '../../utils/store';

const MUTATION_ACCOUNT_KIT = gql`
  mutation GetPrefillViaAccountKit($code: String!) {
    getPrefillViaAccountKit(code: $code) {
      user {
        phoneNumber
      }
      token
    }
  }
`;

type Props = {};
type State = {
  loading: boolean,
};

class AccountKitPage extends Component<Props, State> {
  state = {
    loading: false,
  };

  onMutateAccountKit = (params: ?QueriesAccountKit, getPrefillViaAccountKit: Function) => {
    if (!params) {
      return;
    }

    if (params.status === 'PARTIALLY_AUTHENTICATED') {
      this.setState({ loading: true });
      getPrefillViaAccountKit({ variables: { code: params.code } });
    }
  }

  render() {
    return (
      <RouterContextConsumer>
        {({ history }) => (
          <Mutation
            update={(cache, { data: { getPrefillViaAccountKit } }) => {
              const phoneNumber = R.pathOr('', ['user', 'phoneNumber'], getPrefillViaAccountKit);
              const token = R.propOr('', 'token', getPrefillViaAccountKit);

              setStore('token', token).then(() => {
                this.setState({ loading: false }, () => {
                  history.transitionTo('/registration', { phoneNumber });
                });
              });
            }}
            mutation={MUTATION_ACCOUNT_KIT}>
            {(getPrefillViaAccountKit) => (
              <View>
                {this.state.loading && <Loading transparent />}
                {isElectronRenderer ? (
                  <AccountKitElectron
                    debug={false}
                    onCallback={
                      (params) => this.onMutateAccountKit(params, getPrefillViaAccountKit)
                    }
                  />
                ) : (
                  <AccountKitWeb
                    onCallback={
                      (params) => this.onMutateAccountKit(params, getPrefillViaAccountKit)
                    }
                  />
                )}
              </View>
            )}
          </Mutation>
        )}
      </RouterContextConsumer>
    );
  }
}

export default AccountKitPage;

// @flow
import React, { Component } from 'react';
import R from 'ramda';
import {BASE_URL_BY_LOGIN_TYPE, LOGIN_TYPE} from './config';

type LoginType = 'PHONE' | 'EMAIL';
type Props = {
  debug: boolean,
  locale?: string,
  loginType?: LoginType,
  onCallback: (data: ?Object, error: ?Object) => void,
};
type State = {
  inited: boolean,
  debug: boolean,
  appId: string,
  csrf: string,
  version: string,
};

class AccountKitWeb extends Component<Props, State> {
  static defaultProps = {
    debug: false,
    locale: 'id_ID',
    loginType: LOGIN_TYPE.PHONE,
  };

  state = {
    inited: false,
    appId: '269466223664135',
    csrf: 'b4HBW0rzQUqa+bnYNMJEpA==',
    version: 'v1.0',
    debug: process.env.NODE_ENV !== 'production' || this.props.debug,
  };

  componentDidMount() {
    if (document) {
      // $FlowFixMe
      document.addEventListener("AccountKit", (e: CustomEvent) => {
        const queries = R.pathOr({}, ['detail', 'queries'], e);
        this.props.onCallback && this.props.onCallback(queries, null);
      });
    }
  }

  UNSAFE_componentWillMount() {
    this.injectScript();
  }

  injectScript = () => {
    const script = document.createElement('script');
    script.setAttribute(
      'src',
      `injectScript.js`,
    );
    script.setAttribute('id', 'account-kit');
    script.setAttribute('type', 'text/javascript');
    document.body && document.body.appendChild(script);
  };

  get config() {
    const { locale } = this.props;
    const { appId, csrf, debug } = this.state;

    const _config: Object = {
      app_id: appId,
      state: csrf,
      redirect: 'http://localhost:3000/registration',
      country_code: 'ID',
      debug,
      locale,
    };

    return Object.keys(_config)
      .map(k => `${k}=${_config[k]}`)
      .join('&');
  }

  get src() {
    const { loginType } = this.props;
    const url = BASE_URL_BY_LOGIN_TYPE[loginType || LOGIN_TYPE.PHONE];

    return url + this.config;
  }

  render = () => (
    <webview src={this.src} />
  );
}

export default AccountKitWeb;

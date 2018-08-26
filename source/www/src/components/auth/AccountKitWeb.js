// @flow
import {Component} from 'react';

type LoginType = 'PHONE' | 'EMAIL';
type Props = {
  debug: boolean,
  client: Object,
  language?: string,
  loginType?: LoginType,
  onInit: (data: ?Object, error: ?Object) => void,
};
type State = {
  inited: boolean,
  debug: boolean,
  appId: string,
  csrf: string,
  version: string,
};
const LOGIN_TYPE: {PHONE: 'PHONE', EMAIL: 'EMAIL'} = {
  PHONE: 'PHONE',
  EMAIL: 'EMAIL',
};

class AccountKitWeb extends Component<Props, State> {
  static defaultProps = {
    debug: false,
    language: 'id_ID',
    loginType: LOGIN_TYPE.PHONE,
  };

  state = {
    inited: false,
    appId: '269466223664135',
    csrf: 'b4HBW0rzQUqa+bnYNMJEpA==',
    version: 'v1.0',
    debug: process.env.NODE_ENV !== 'production' || this.props.debug,
  }

  componentDidMount() {
    this.injectScript();
    this.initAccountKit();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if(!prevState.inited && this.state.inited) {
      (cb => {
        window.AccountKit_OnInteractive = () => {
          window.AccountKit.init({
            appId: this.state.appId,
            state: this.state.csrf,
            version: this.state.version,
            fbAppEventsEnabled: true,
            display: 'modal',
            origin: 'http://localhost:3000',
            debug: prevState.debug,
          })
        }
        cb();
      })(() => {
        setTimeout(() => {
          // console.log('callback...', window.AccountKit);
          window.AccountKit.login(LOGIN_TYPE.PHONE, {countryCode: '+62'}, resp => console.log(resp));
        }, 2000);
      })
    }
  }

  injectScript = () => {
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      `https://sdk.accountkit.com/${this.props.language}/sdk.js`
    );
    script.setAttribute('id', 'account-kit');
    script.setAttribute('type', 'text/javascript');
    // @FlowFixMe
    document.body.appendChild(script);
  };

  initAccountKit = () => {
    // this.props.client.init()
    //   .then((data) => {
    //     data.init.debug = this.state.debug;
        // this.setState({
        //   inited: true,
        //   appId: data.init.appId || this.state.appId,
        //   csrf: data.init.csrf || this.state.csrf,
        //   version: data.init.version || this.state.version,
        // })
      //   this.props.onInit(data, null);
      // })
      // .catch((error) => {
      //   this.props.onInit(null, error)
      // });
      this.setState({
        inited: true,
        appId: this.state.appId,
        csrf: this.state.csrf,
        version: this.state.version,
      })
  };

  render = () => null;
}

export default AccountKitWeb;

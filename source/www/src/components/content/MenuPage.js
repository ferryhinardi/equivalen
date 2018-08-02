// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Player } from 'video-react';
import {Page} from '../common';
import MenuView from './MenuView';

type Props = {};

class MenuPage extends Component<Props> {
  static contextTypes = {
    history: PropTypes.object,
  };

  render() {
    return (
      <Page>
        <MenuView title="Tryout" onClick={() => this.context.history.push('/main')} />
        <Player
          src="https://00e9e64bac69289302b18f84cd59887fb2f52e94bf78b8fc6e-apidata.googleusercontent.com/download/storage/v1/b/video-tutor/o/1-tutorial.mp4?qk=AD5uMEs9oPD0TV0IWRTqIlV2MI7iYNO3a8Cn10O-4IeQT4tPJw2DtBtPNxVYi-T3n4NhtT8YghbI5YIPjqxo9BGJ67Rto0n2TXZwo3YTYGfOdvdPtAd30hVCAaekuqIFA6C9phC_rUea0CJ1gYa3pPPt95LM1GH2ZpnToDAMTUAmtlZ_aWSlph2_acO90-v-jLGx9IeHi21kjxfkTCQQKNek3e_rKB4kgFGQRm_ZyWGbBxehbFdNH7SsaDJg-Av6s3KaFx1l07kys9ahZruJBMJPik5XFb-nVNq8XMCFfQmwGEnDIaruoxi0VmES-_nEZe2j2OOyXeZtNHjrsEnK_ZKOhgCie9O4A4HOyCidrgugaCl6eppPJQPbYINAkuweNLUwAPm-PxT4w1NOHEZ1OMH1xDxMwT5LZRRTyKFlL5sQuC_kzH8UC7JZiaZYgHs5VqBdHGphMUp4X23PWJb_Z5troK0LVgkqxesvQhOI4HeFssEY7AIRWjRZ11DUxe86MH-EBopFylkfHoKMuoexWiG4gYVjjbchdqEJjdEPvPS5hD9UI0sNgMOfOdSfdlWN2KLF88QjlzSKYOO63hV_4fETTK6vO8yRvTWZU2XR-UqJkWeMo2QNVUbhFWdQyL77tpei2OH5WtOvlytkfsK0WSC8O8-GlvBdQHPjS5Z3bN5QBuXM3SjpvDpTbekZhw0X9NACWmemHuK2wGbX1Z2mrL4u0T3rdxw1uvgMVkRKWBuOPQ2md2jPVSM"
        />
      </Page>
    );
  }
}

export default MenuPage;

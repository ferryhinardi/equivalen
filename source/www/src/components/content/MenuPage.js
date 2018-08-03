// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
        <MenuView title="Tryout 1" onClick={() => this.context.history.push('/main')} />
      </Page>
    );
  }
}

export default MenuPage;

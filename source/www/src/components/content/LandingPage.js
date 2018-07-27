// @flow

import React, {Component} from 'react';
import {Redirect, Route} from 'react-router';
import {Page} from '../common';
import Colors from '../../utils/colors';
import logo from '../../images/logo.svg';

const styles = {
  logo: {
    background: `url(${logo}) no-repeat center center fixed`,
    backgroundSize: '200px 200px',
    width: '200px',
    height: '200px',
  },
};

const Landing = () => (
  <Page backgroundColor={Colors.primary}>
    <div style={styles.logo} className="App-logo" />
    <label style={{color: Colors.white}}>Equivalent</label>
  </Page>
);

class LandingPage extends Component {
  state = {
    showLandingPage: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({showLandingPage: false});
    }, 3000);
  }

  render() {
    return <Route exact path="/" render={() => (
      this.state.showLandingPage ? (
        <Landing />
      ) : (
        <Redirect to="/login" />
      )
    )} />
  }
}

export default LandingPage;

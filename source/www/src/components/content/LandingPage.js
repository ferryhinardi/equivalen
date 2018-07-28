// @flow

import React, {Component} from 'react';
import {Image, Text} from 'react-native';
import {Redirect, Route} from 'react-router';
import {Page} from '../common';
import Colors from '../../utils/colors';
import logo from '../../images/logo.svg';

const styles = {
  image: {width: 100, height: 100},
  text: {color: Colors.white},
};

const Landing = () => (
  <Page backgroundColor={Colors.primary}>
    <Image source={logo} style={styles.image} />
    <Text style={styles.text}>Equivalent</Text>
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
    return (
      <Route
        path="/"
        render={() => (
          this.state.showLandingPage ? (
            <Landing />
          ) : (
            <Redirect to="/login" />
          )
        )}
      />
    );
  }
}

export default LandingPage;

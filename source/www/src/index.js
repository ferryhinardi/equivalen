import React from 'react';
import {View} from 'react-native';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';
import {Info} from './components/common';
import {LandingPage} from './components/content';
import {LoginPage, RegistrationPage} from './components/auth';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <View>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/registration" component={RegistrationPage} />
      <Route path="/info" component={Info} />
    </View>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();

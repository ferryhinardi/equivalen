import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './index.css';
import Root from './components/root';
import {Info, PageNotFound} from './components/common';
import {SplashPage, IntroPage, MenuPage, MainPage} from './components/content';
import {LoginPage, RegistrationPage} from './components/auth';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <Route
      render={({history}) => (
        <Root path="/" history={history}>
          <Switch>
            <Route path="/splash" component={SplashPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/registration" component={RegistrationPage} />
            <Route path="/info" component={Info} />
            <Route path="/intro" component={IntroPage} />
            <Route path="/main-menu" component={MenuPage} />
            <Route path="/main" component={MainPage} />
            <Redirect from="/" to="/splash" />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Root>
      )}
    />
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();

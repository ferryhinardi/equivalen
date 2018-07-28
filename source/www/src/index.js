import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './index.css';
import Root from './components/root';
import {Info, PageNotFound} from './components/common';
import {SplashPage} from './components/content';
import {LoginPage, RegistrationPage} from './components/auth';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <Route
      render={({history}) => (
        <Root history={history}>
          <Switch>
            <Route exact path="/" component={SplashPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/registration" component={RegistrationPage} />
            <Route path="/info" component={Info} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Root>
      )}
    />
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store';
import './index.css';
import Root from './components/root';
import { Info, PageNotFound } from './components/common';
import { SplashPage, MainPage } from './components/content';
import { PersistorProvider } from './components/context/persistor.context';
import { MenuPage } from './components/menu';
import { LoginPage, RegistrationPage, IntroPage, AccountKitPage } from './components/auth';
import { ApolloProvider } from './apollo';
// import registerServiceWorker from './registerServiceWorker';

const root = document.getElementById('root');

window.onload = () => {
  const { store, persistor } = configureStore();
  ReactDOM.render(
    <Router>
      <Route
        render={({history}) => (
          <ApolloProvider>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <PersistorProvider persistor={persistor}>
                  <Root path="/" history={history}>
                    <Switch>
                      <Route path="/splash" component={SplashPage} />
                      <Route path="/login" component={LoginPage} />
                      <Route path="/account-kit" component={AccountKitPage} />
                      <Route path="/registration" component={RegistrationPage} />
                      <Route path="/info" component={Info} />
                      <Route path="/intro" component={IntroPage} />
                      <Route path="/main-menu" component={MenuPage} />
                      <Route path="/main" component={MainPage} />
                      <Redirect from="/" to="/splash" />
                      <Route path="*" component={PageNotFound} />
                    </Switch>
                  </Root>
                </PersistorProvider>
              </PersistGate>
            </Provider>
          </ApolloProvider>
        )}
      />
    </Router>,
    // $FlowFixMe
    root
  );
};

// registerServiceWorker();

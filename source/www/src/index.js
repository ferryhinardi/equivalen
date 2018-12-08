/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';
import App from './components/App';
// import App from './components/App.navigation';

import './index.css';

// import registerServiceWorker from './registerServiceWorker';

const root = document.getElementById('root');

window.onload = () => {
  ReactDOM.render(
    <HashRouter basename="/" hashType="slash">
      <Route
        render={({ history }) => (
          <App history={history} /> 
        )}
      />
    </HashRouter>,
    // $FlowFixMe
    root
  );
};

// registerServiceWorker();


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App';

import './index.css';

// import registerServiceWorker from './registerServiceWorker';

const root = document.getElementById('root');

window.onload = () => {
  ReactDOM.render(
    <Router>
      <Route
        render={({ history }) => (
          <App history={history} />
        )}
      />
    </Router>,
    // $FlowFixMe
    root
  );
};

// registerServiceWorker();


import React, { Component } from 'react';
import Welcome from './components/Welcome';
import Loading from './components/Loading';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Welcome />
      </div>
    );
  }
}

export default App;

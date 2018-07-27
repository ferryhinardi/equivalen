import React, {Component} from 'react';
import logo from '../../images/logo.svg';
import './auth.css';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  logo: {
    background: `url(${logo}) no-repeat center center`,
    backgroundSize: '8rem 8rem',
    width: '8rem',
    height: '8rem',
  },
};

class WelcomeMessage extends Component {
  render() {
    return (
      <div style={styles.container}>
        <label className="commom-text">Selamat datang di</label>
        <div style={styles.logo} />
        <label className="commom-text">
          Kami senang kami tidak sendiri mewujudkan mimpi.
        </label>
      </div>
    );
  }
}

export default WelcomeMessage;

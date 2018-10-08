import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from './app/header';
import { AlfamartCard } from './app/cards';
import request from './request';

const styles = {
  row: { marginTop: 8, marginBottom: 8 },
};

class App extends Component {
  componentDidMount() {
    request.init('http://localhost:3001');
  }

  render() {
    return (
      <div>
        <Header />
        <Container>
          <h1>Payment Generator</h1>
          <div style={styles.row}>
            <Row>
              <Col xs="3">
                <AlfamartCard />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default App;

import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from 'reactstrap';
import request from '../../request';

const styles = {
  subtitle: {
    display: 'flex',
  },
  valuePaymentCode: {
    marginLeft: 4,
    marginRight: 4,
  },
};
const alfamartLogo = require('../../media/images/alfamart.png');
class AlfamartCard extends React.Component {
  state = {
    mutating: false,
    paymentCode: null,
  };

  _generate = () => {
    this.setState({ mutating: true }, () => {
      request.post('/api/invoice', {}, null, (error, response) => {
        if (response.success) {
          const data = response.data;
          const availableRetailOutlets = data.available_retail_outlets;
          const alfamartPayment = availableRetailOutlets.find(
            outlet => outlet.retail_outlet_name === 'ALFAMART'
          );
  
          this.setState({ paymentCode: alfamartPayment.payment_code, mutating: false });
        }
      });
    });
  };

  render() {
    return (
      <Card>
        <CardImg top width="100%" src={alfamartLogo} alt="Alfamart" />
        <CardBody>
          <CardTitle>Alfamart</CardTitle>
          {this.state.paymentCode ? (
            <div style={styles.subtitle}>
              <CardText>Payment Code:</CardText>
              <p className="text-success" style={styles.valuePaymentCode}>
                {this.state.paymentCode}
              </p>
            </div>
          ) : null}
          <Button onClick={this._generate} disabled={this.state.mutating}>Generate</Button>
        </CardBody>
      </Card>
    );
  };
}

export default AlfamartCard;

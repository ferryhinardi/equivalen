// @flow
import React from 'react';
import { Button } from './ui';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: auto;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledButton = Button.extend`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  @media only screen and (max-device-width: 480px){
    padding-left: 6px;
    padding-right: 6px;
  }
`;

const OrderButton = () => (
  <Container>
    <InnerContainer>
      <StyledButton
        color="gradient"
        onClick={() => {}}
      >
        PEMESANAN
      </StyledButton>
    </InnerContainer>
  </Container>
);

export default OrderButton;

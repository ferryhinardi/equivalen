// @flow
import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import variables from '../ui/variables';

type Props = {};

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  background: ${variables.colorWhite};
`;

const WrapperHeader = styled.div`
  padding-bottom: 72px;
`;

const WrapperDownload = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Link = styled.a``;

class DownloadPackage extends React.Component<Props> {
  render() {
    return (
      <Container>
        <WrapperHeader>
          <Header />
        </WrapperHeader>
        <WrapperDownload>
          <Link href="https://storage.googleapis.com/installer-win/exmedia%20Setup%201.0.0%20-%2032%20Bit.exe">Windows 32 Bit</Link>
        </WrapperDownload>
        <WrapperDownload>
          <Link href="https://storage.googleapis.com/installer-win/exmedia%20Setup%201.0.0%20-%2064%20Bit.exe">Windows 64 Bit</Link>
        </WrapperDownload>
      </Container>
    );
  }
}

export default DownloadPackage;

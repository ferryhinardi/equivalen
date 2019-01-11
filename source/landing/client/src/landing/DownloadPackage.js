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
          <Link href="https://goo.gl/forms/Clj2vIHxU66HiETt1" target="_blank">Windows 32 Bit</Link>
        </WrapperDownload>
        <WrapperDownload>
          <Link href="https://goo.gl/forms/v2qGfyx0EvLzrNV92" target="_blank">Windows 64 Bit</Link>
        </WrapperDownload>
      </Container>
    );
  }
}

export default DownloadPackage;

// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import svgFacebook from './img/social/facebook.svg';
import svgMedium from './img/social/medium.svg';

import svgTelegram from './img/social/telegram.svg';
import svgTwitter from './img/social/twitter.svg';
import svgYouTube from './img/social/youtube.svg';

const Container = styled.div``;

const InnerContainer = styled.div`
  display: inline-block;
  ${breakpoint('tablet')`
  `};
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  ${breakpoint('tablet')`
  `};
`;

const Icon = styled.div`
  flex: 0 0 21px;
  width: 21px;
  margin: 0 12px;
  opacity: 0.25;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  ${breakpoint('tablet')`
    &:hover {
      opacity: .5;
  `};
`;

const IconImage = styled.img`
  width: 100%;
`;

export const SocialIcons = () => (
  <Container>
    <InnerContainer>
      <Icons>
        <Icon>
          <Link
            to=""
            target="_blank"
          >
            <IconImage src={svgTelegram} alt="Telegram" />
          </Link>
        </Icon>
        <Icon>
          <Link to="" target="_blank">
            <IconImage src={svgFacebook} alt="Facebook" />
          </Link>
        </Icon>
        <Icon>
          <Link to="" target="_blank">
            <IconImage src={svgTwitter} alt="Twitter" />
          </Link>
        </Icon>
        <Icon>
          <Link
            to=""
            target="_blank"
          >
            <IconImage src={svgYouTube} alt="YouTube" />
          </Link>
        </Icon>
        <Icon>
          <Link to="" target="_blank">
            <IconImage src={svgMedium} alt="Medium" />
          </Link>
        </Icon>
      </Icons>
    </InnerContainer>
  </Container>
);

export default SocialIcons;

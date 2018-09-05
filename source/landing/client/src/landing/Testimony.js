// @flow
import React from 'react';
import { Transition } from 'react-transition-group';
import Waypoint from 'react-waypoint';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import ScrollToTarget from './ScrollToTarget';
import variables from '../ui/variables';

const Container = styled.div`
  margin-bottom: 48px;
  ${breakpoint('tablet')`
    margin-bottom: 96px;
  `};
`;

const InnerContainer = styled.div`
  text-align: center;
  padding: 0 24px;
  ${breakpoint('tablet')`
    width: 800px;
    margin: 0 auto;
    text-align: center;
  `};
`;

const Heading = styled.div`
  font-family: ${variables.fontPrimary};
  font-weight: ${variables.fontWeightBold};
  font-size: ${variables.fontSizeLargest};
  line-height: 1.2;
  margin-bottom: 24px;
  color: ${variables.colorRed};
  ${breakpoint('tablet')`
    font-size: ${variables.fontSizeHuge};
    letter-spacing: -1px;
  `};
`;

const Body = styled.div`
  color: ${variables.colorNeutral};
  font-family: ${variables.fontPrimary};
  line-height: 1.4;
  margin-bottom: 24px;
  ${breakpoint('tablet')`
    font-size: ${variables.fontSizeNormal};
    margin-bottom: 36px;
  `};
`;

const FadeTransition = styled.div`
  opacity: 0;
  transition: all 0.9s;
  ${props => props.delay && `transition-delay: ${props.delay}ms`};
  ${props =>
    (props.state === 'entering' || props.state === 'entered') &&
    `
    opacity: 1;
  `};
`;

const ContainerTestimonyCard = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const TestimonyCard = styled.div`
  width: 30%;
  border: ${props =>
    props.red ?
      `2px solid ${variables.colorRed}` :
      `2px solid ${variables.colorNeutralDarkest}`};
  padding: ${variables.largeSize};
  border-radius: ${variables.largeSize};
  margin: ${variables.mediumSize};
`;

type Props = {};

type State = {
  isVisible: boolean,
};

class Testimony extends React.Component<Props, State> {
  state = {
    isVisible: true,
  };

  handleWaypointEnter = () => {
    this.setState({ isVisible: true });
  };

  handleWaypointLeave = () => {
    this.setState({ isVisible: false });
  };

  render() {
    return (
      <ScrollToTarget hash="#testimony" pos="center">
        <Waypoint
          onEnter={this.handleWaypointEnter}
          onLeave={this.handleWaypointLeave}
          topOffset="5%"
          bottomOffset="20%"
        >
          <Container>
            <Transition in={this.state.isVisible} timeout={2000}>
              {state => (
                <InnerContainer>
                  <FadeTransition state={state} delay={150}>
                    <Heading>Apa pendapat mereka tentang kami?</Heading>
                  </FadeTransition>
                  <FadeTransition state={state} delay={300}>
                    <Body>
                      <ContainerTestimonyCard>
                        <TestimonyCard red>
                          "Alhamdulilah kak, hari ini UN berjalan lancar jaya dan saya tambah percaya diri. Berkat exmedia saya sangat terbantu kak, makasi." <br /> <br /> (M Ilham, SMPN 207)
                        </TestimonyCard>
                        <TestimonyCard>
                          "Saya peringkat 2 USBN kak! Makasi kak. Sekarang saya akan berusaha masuk ke SMAN. Sekali lagi makasi ya kak." <br /> <br /> (Fahmi, SMPN 130)
                        </TestimonyCard>
                        <TestimonyCard red>
                          "Tidak ada kendala apa pun dalam memakai exmedia. Saya sangat mudah belajar. Video exmedia membuat saya cepat mengerti. Terima kasih." <br /> <br /> (Lani, SMPN 127)
                        </TestimonyCard>
                        <TestimonyCard>
                          "Makasi kak, gara-gara exmedia UN jadi lebih ringan." <br /> <br /> (Nyoman, SMPN 127)
                        </TestimonyCard>
                        <TestimonyCard red>
                          "Terima kasih kak untuk bimbingannya. Aku bisa menggunakan exmedia-nya buat belajar. Sukses selalu buat exmedia!" <br /> <br /> (Egy, SMPN 206)
                        </TestimonyCard>
                        <TestimonyCard>
                        "Hasil UN saya: Bahasa Indonesia 86, Bahasa Inggris 98, Matematika 70, IPA 85. Makasi kak exmedia-nya!" <br /> <br /> (M Durmuji, SMPN 170)
                        </TestimonyCard>
                      </ContainerTestimonyCard>
                    </Body>
                  </FadeTransition>
                </InnerContainer>
              )}
            </Transition>
          </Container>
        </Waypoint>
      </ScrollToTarget>
    );
  }
}

export default Testimony;

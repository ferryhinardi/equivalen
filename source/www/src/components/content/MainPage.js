// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import mainAction from '../../actions/main';
import HeaderMain from './HeaderMain';
import MainBoard from './MainBoard';
import TutorialBoard from './TutorialBoard';
import FooterMain from './FooterMain';
import PageNumberList from './PageNumberList';
import { RouterContextConsumer } from '../context/router.context';
import { setPageList } from '../../utils/pageNumber';
import Colors from '../../utils/colors';
import type { History, UserPickLesson, ParamAnswer } from '../types.shared';
import data from '../../data';

type Props = {
  userPickLesson: UserPickLesson,
  mainActionCreator?: Object,
};
type State = {};

const styles = {
  mainBackground: {
    backgroundColor: Colors.mainBackground,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    margin: 8,
    padding: 16,
    borderWidth: 3,
    borderColor: Colors.white,
    flex: 1,
    zIndex: -1,
    flexDirection: 'row',
    overflowX: 'hidden',
  },
  bullet: {
    color: Colors.white,
    fontSize: 24,
  },
};

const mapStateToProps = state => ({
  userPickLesson: state.main.userPickLesson,
});

const mapDispatchToProps = dispatch => ({
  mainActionCreator: bindActionCreators(mainAction, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class MainPage extends Component<Props, State> {
  setAnswer = ({ no, answer }: ParamAnswer) => {
    this.props.mainActionCreator &&
      this.props.mainActionCreator.setAnswerAction({
        no,
        answer,
      });
  };

  render() {
    const { matpel, to, answers } = this.props.userPickLesson;
    const lessonData = data[matpel];

    return (
      <RouterContextConsumer>
        {({history}: {history: History}) => {
          const { page = 1, mode } = history.getCurrentState();
          const Content = mode === 'tutorial' ?
          (
            <TutorialBoard
              page={page}
              matpel={matpel}
              to={to}
            />
          ) :
          (
            <MainBoard
              page={page}
              matpel={matpel}
              to={to}
              answers={answers}
              setAnswer={this.setAnswer}
            />
          );

          return (
            <View style={styles.mainBackground}>
              <HeaderMain
                matpel={matpel}
                showTimer={mode !== 'tutorial'}
                tryouts={lessonData.tryouts}
              />
              <View style={styles.content}>
                <Text style={styles.bullet}>{`${page}.`}</Text>
                {Content}
                <PageNumberList
                  data={setPageList(lessonData.totalQuestion, answers)}
                />
              </View>
              <FooterMain history={history} totalPages={lessonData.totalQuestion} />
            </View>
          );
        }}
      </RouterContextConsumer>
    );
  }
}

export default MainPage;

// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native'
import isElectron from 'is-electron-renderer';
import { Loading } from '../common';
import Colors from '../../utils/colors';
import HeaderMain from './HeaderMain';
import MainBoard from './MainBoard';
import TutorialBoard from './TutorialBoard';
import FooterMain from './FooterMain';
import PageNumberList from './PageNumberList';
import {RouterContextConsumer} from '../context/router.context';
import { setPageList } from '../../utils/pageNumber';
import { getStore, setStore } from '../../utils/store';
import type { History, ParamAnswer, MatPel, MappingAnswer } from '../types.shared';
import data from '../../data';

type LessonData = { matpel: MatPel, to: string, totalSoal: number, tryouts: Array<string> };
type Props = {};
type State = {
  answers: MappingAnswer,
  lessonData: LessonData,
  loading: boolean,
  stopTimer: boolean,
  resetTimer: boolean,
  showModalResult: boolean,
};

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

class MainPage extends Component<Props, State> {
  state = {
    answers: {},
    lessonData: {
      matpel: 'bhsindo',
      to: '',
      totalSoal: 50,
    },
    loading: true,
    stopTimer: false,
    resetTimer: false,
    showModalResult: false,
  };

  componentDidMount() {
    getStore(
      ['matpel', 'to', 'answer']).then(
      (r) => {
        let answers;
        if (!r.answer) {
          answers = {};
        } else {
          answers = isElectron ? r.answer : JSON.parse(r.answer);
        }

        this.setState({
          lessonData: {
            ...data[r.matpel],
            matpel: r.matpel,
            to: r.to,
          },
          answers,
          loading: false,
        })
      }
    );
  }

  setAnswer = ({no, answer}: ParamAnswer) => {
    const currentAns = this.state.answers;
    const combineAns = {...currentAns, [no]: answer};

    setStore('answer', combineAns).then(() => this.setState({ answers: combineAns }));
  };

  _onTimeOut = () => {
    this.setState({ stopTimer: true, resetTimer: false });
  };

  _onStartResumeTimer = (reset?: boolean) => {
    if (reset) {
      this.setState({ resetTimer: true });
    }

    this.setState({ stopTimer: false });
  };

  setVisibleModalResult = (visible: boolean) => {
    this.setState({ showModalResult: visible });
  }

  render() {
    return (
      <RouterContextConsumer>
        {({history}: {history: History}) => {
          const {page = 1, mode} = history.getCurrentState();
          const Content = mode === 'tutorial' ?
          (
            <TutorialBoard
              page={page}
              matpel={this.state.lessonData.matpel}
              to={this.state.lessonData.to}
            />
          ) :
          (
            <MainBoard
              page={page}
              matpel={this.state.lessonData.matpel}
              to={this.state.lessonData.to}
              answers={this.state.answers}
              setAnswer={this.setAnswer}
            />
          );

          return this.state.loading ? <Loading /> : (
            <View style={styles.mainBackground}>
              <HeaderMain
                matpel={this.state.lessonData.matpel}
                showTimer={mode !== 'tutorial'}
                resetTimer={this.state.resetTimer}
                stopTimer={this.state.stopTimer}
                showModalResult={this.state.showModalResult}
                onTimeOut={this._onTimeOut}
                onStartResumeTimer={this._onStartResumeTimer}
                tryouts={this.state.lessonData.tryouts}
              />
              <View style={styles.content}>
                <Text style={styles.bullet}>{`${page}.`}</Text>
                {Content}
                <PageNumberList
                  onTimeOut={this._onTimeOut}
                  setVisibleModalResult={this.setVisibleModalResult}
                  data={setPageList(this.state.lessonData.totalSoal, this.state.answers)}
                />
              </View>
              <FooterMain history={history} totalPages={this.state.lessonData.totalSoal} />
            </View>
          );
        }}
      </RouterContextConsumer>
    );
  }
}

export default MainPage;

// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Colors from '../../utils/colors';
import { secondsToTime } from '../../utils/timer';
import { setStore } from '../../utils/store';
import { DEFAULT_TIMER } from '../../constants';

type Props = {
  startTime: boolean,
  reset?: boolean,
  onTimeOut: () => void,
};
type State = {
  startTime: boolean,
  time: {
    h: string,
    m: string,
    s: string,
  },
  seconds: number,
};

const styles = {
  wrapper: {
    borderWidth: 2,
    borderColor: Colors.white,
    padding: 8,
    justifyContent: 'center',
    width: '12%',
  },
  text: {
    color: Colors.white,
    fontSize: 24,
    textAlign: 'center',
  },
};

class Timer extends Component<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.startTime !== prevState.startTime) {
      return {
        ...prevState,
        startTime: nextProps.startTime,
      };
    }
    return null;
  }

  state = {
    startTime: false,
    time: {
      h: '00',
      m: '00',
      s: '00',
    },
    seconds: DEFAULT_TIMER,
  };

  componentDidMount() {
    const timeLeftVar = secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const isStartTimer = this.state.startTime !== prevState.startTime && this.state.startTime;
    const isStopTimer = this.state.startTime !== prevState.startTime && !this.state.startTime;
    const isResetTimer = this.props.reset !== prevProps.reset && !!this.props.reset;

    if (isStartTimer) {
      if (isResetTimer) {
        this.resetTimer();
      }

      this.timer = null;
      this.startTimer();
    } else if (isStopTimer) {
      if (this.timer !== null) clearInterval(this.timer);
    }
  }

  timer: ?IntervalID = null;

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: secondsToTime(seconds),
      seconds,
    });
    setStore('time', seconds);

    // Check if we're at zero.
    if (seconds === 0) {
      if (this.timer !== null) clearInterval(this.timer);
      this.props.onTimeOut && this.props.onTimeOut();
    }
  }

  resetTimer = () => {
    this.setState({ seconds: DEFAULT_TIMER });
  };

  startTimer = () => {
    if (this.timer === null) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.text}>
          {`${this.state.time.h}:${this.state.time.m}:${this.state.time.s}`}
        </Text>
      </View>
    );
  }
}

export default Timer;

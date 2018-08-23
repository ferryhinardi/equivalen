// @flow

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Colors from '../../utils/colors';

type Props = {
  startTime: boolean,
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
  text: {color: Colors.white, fontSize: 24, textAlign: 'center'},
};
const DEFAULT_TIMER = 7200;

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
    const timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({time: timeLeftVar});
    this.startTimer();
  }

  componentDidUpdate(_, prevState: State) {
    if (this.state.startTime !== prevState.startTime && this.state.startTime) {
      this.timer = null;
      this.resetTimer();
      this.startTimer();
    }
  }

  timer: ?IntervalID = null;

  secondsToTime = (secs: number) => {
    const hours = Math.floor(secs / (60 * 60));
    const hourText = `0${hours}`.slice(-2);

    const divisor_for_minutes = secs % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);
    const minuteText = `0${minutes}`.slice(-2);

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);
    const secondText = `0${seconds}`.slice(-2);

    const obj = {
      h: hourText,
      m: minuteText,
      s: secondText,
    };
    return obj;
  };

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      if (this.timer !== null) clearInterval(this.timer);
      this.props.onTimeOut && this.props.onTimeOut();
    }
  }

  resetTimer = () => {
    this.setState({seconds: DEFAULT_TIMER});
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

// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import globalAction from '../../actions/global';
import Colors from '../../utils/colors';
import { secondsToTime } from '../../utils/timer';

type Props = {
  startTime: boolean,
  reset?: boolean,
  onTimeOut: () => void,
  globalActionCreator: Object,
  time: number,
};
type State = {
  startTime: boolean,
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
  };

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const isStartTimer = this.state.startTime !== prevState.startTime && this.state.startTime;
    const isStopTimer = this.state.startTime !== prevState.startTime && !this.state.startTime;
    const isResetTimer = this.props.reset !== prevProps.reset && !!this.props.reset;

    if (isStartTimer) {
      if (isResetTimer) {
        this.props.globalActionCreator.resetTimeAction();
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
    const seconds = this.props.time - 1;
    this.props.globalActionCreator.updateTimeAction(seconds);

    // Check if we're at zero.
    if (seconds === 0) {
      if (this.timer !== null) clearInterval(this.timer);
      this.props.onTimeOut && this.props.onTimeOut();
    }
  }

  startTimer = () => {
    if (this.timer === null) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  render() {
    const {h, m, s} = secondsToTime(this.props.time);
    return (
      <View style={styles.wrapper}>
        <Text style={styles.text}>
          {`${h}:${m}:${s}`}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  time: state.global.time,
});

const mapDispatchToProps = dispatch => ({
  globalActionCreator: bindActionCreators(globalAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

const updateTimeAction = (time) => dispatch =>
  dispatch({
    type: 'UPDATE_TIMER',
    payload: time,
  });

const resetTimeAction = () => dispatch =>
  dispatch({
    type: 'RESET_TIMER',
  });

const setMatpelAction = (matpel) => dispatch =>
  dispatch({
    type: 'SET_MATPEL',
    payload: matpel,
  });

const setTryoutAction = (tryout) => dispatch =>
  dispatch({
    type: 'SET_TRYOUT',
    payload: tryout,
  });

const setAnswerAction = (tryout) => dispatch =>
  dispatch({
    type: 'SET_ANSWER',
    payload: tryout,
  });

export default {
  updateTimeAction,
  resetTimeAction,
  setMatpelAction,
  setTryoutAction,
  setAnswerAction,
};

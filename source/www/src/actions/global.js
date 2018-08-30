const updateTimeAction = (time) => dispatch => {
  dispatch({
    type: 'UPDATE_TIMER',
    payload: time,
  })
};

const resetTimeAction = () => dispatch => {
  dispatch({
    type: 'RESET_TIMER',
  })
};

export default {
  updateTimeAction,
  resetTimeAction,
};

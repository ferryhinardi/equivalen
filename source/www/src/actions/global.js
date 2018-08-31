const updateTimeAction = (time) => dispatch =>
  dispatch({
    type: 'UPDATE_TIMER',
    payload: time,
  });

const resetTimeAction = () => dispatch =>
  dispatch({
    type: 'RESET_TIMER',
  });

const visibleModalTryoutAction = (visible) => dispatch =>
  dispatch({
    type: 'VISIBLE_MODAL_TRYOUT',
    payload: visible,
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

export default {
  updateTimeAction,
  resetTimeAction,
  visibleModalTryoutAction,
  setMatpelAction,
  setTryoutAction,
};

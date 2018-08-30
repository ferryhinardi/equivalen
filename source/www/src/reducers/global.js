import { DEFAULT_TIMER } from '../constants';

const initialState = {
  time: DEFAULT_TIMER,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TIMER':
    return {
      time: action.payload,
    };
    case 'RESET_TIMER':
    return {
      time: DEFAULT_TIMER,
    };
    default:
    return state
  }
};

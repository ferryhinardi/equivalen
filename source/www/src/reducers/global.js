import update from 'immutability-helper';
import { DEFAULT_TIMER } from '../constants';

const initialState = {
  time: DEFAULT_TIMER,
  showModalTryout: false,
  userPickLesson: {
    matpel: 'bhsindo',
    to: '1',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TIMER':
      return update(state, {
        time: { $set: action.payload },
      });

    case 'RESET_TIMER':
      return update(state, {
        time: { $set: DEFAULT_TIMER },
      });

    case 'VISIBLE_MODAL_TRYOUT':
      return update(state, {
        showModalTryout: { $set: action.payload },
      });

    case 'SET_MATPEL':
      return update(state, {
        userPickLesson: {
          matpel: { $set: action.payload },
        },
      });

    case 'SET_TRYOUT':
      return update(state, {
        userPickLesson: {
          to: { $set: action.payload },
        },
      });

    default:
      return state;
  }
};

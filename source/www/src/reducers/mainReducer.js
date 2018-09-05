import update from 'immutability-helper';
import { DEFAULT_TIMER } from '../constants';

const initialState = {
  time: DEFAULT_TIMER,
  userPickLesson: {
    matpel: 'bhsindo',
    to: 1, // 0 => mean random soal
    answers: {},
  },
  dataQuestion: {},
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

    case 'SET_ANSWER':
      return update(state, {
        userPickLesson: {
          answers: { $set: action.payload },
        },
      });

    case 'SET_QUESTION':
      return update(state, {
        dataQuestion: { $set: action.payload },
      });

    default:
      return state;
  }
};

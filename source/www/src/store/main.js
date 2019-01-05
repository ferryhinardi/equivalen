import update from 'immutability-helper';
import _ from 'lodash';
import { DEFAULT_TIMER } from '../constants';

const state = {
  time: DEFAULT_TIMER,
  startTime: true,
  currentMatpel: 'bhsindo',
  userLessonData: {},
};

const toogleStartTimeAction = (_obj, isShow, { cache }) => {
  return update(state, {
    startTime: {
      $apply: (startTime) => isShow !== undefined ? isShow : !startTime,
    },
  });
};

const updateTimeAction = (_obj, time, { cache }) => {
  return update(state, {
    time: { $set: time },
  });
};

const resetTimeAction = (_obj, {}, { cache }) => {
  return update(state, {
    time: { $set: DEFAULT_TIMER },
  });
};

const setTryoutAction = (_obj, tryout, { cache }) => {
  return update(state, {
    userLessonData: {
      [state.currentMatpel]: {
        to: {
          $set: tryout,
        },
      },
    },
  });
};

const setAnswerAction = (_obj, { no, answer, isDoubt }, { cache }) => {
  return update(state, {
    userLessonData: {
      [state.currentMatpel]: {
        answers: {
          $apply: (answers) => {
            const cloneAnswers = _.clone(answers);
            const prevCurrentAnswer = cloneAnswers[no] || {};
            const isDoubt =
              typeof isDoubt === 'undefined' ?
                prevCurrentAnswer.isDoubt :
                isDoubt;

            return {
              ...cloneAnswers,
              [no]: { answer, isDoubt },
            };
          },
        },
      },
    },
  });
};

const resetAnswerAction = (_obj, {}, { cache }) => {
  return update(state, {
    userLessonData: {
      [state.currentMatpel]: {
        answers: { $set: {} },
      },
    },
  });
};

const setLessonData = (_obj, { matpel, to, dataQuestion }, { cache }) => {
  return update(state, {
    userLessonData: {
      $set: {
        [matpel]: {
          to,
          dataQuestion,
          answers: {},
        },
      },
    },
    currentMatpel: { $set: matpel },
  });
};

export {
  mainInititalState: state,
  toogleStartTimeAction,
  updateTimeAction,
  resetTimeAction,
  setTryoutAction,
  setAnswerAction,
  resetAnswerAction,
  setLessonData,
};

const setArchiveRuleAction = (data) => dispatch =>
  dispatch({
    type: 'ARCHIVE_RULE_ACTION',
    payload: data,
  });

const setChapterArchiveAction = (data) => dispatch =>
  dispatch({
    type: 'SET_CHAPTER_ARCHIVE',
    payload: data,
  });

const clickToSelectQuestion = (data) => dispatch =>
  dispatch({
    type: 'CLICK_TO_SELECT_QUESTION',
    payload: data,
  });

export default {
  setArchiveRuleAction,
  setChapterArchiveAction,
  clickToSelectQuestion,
}

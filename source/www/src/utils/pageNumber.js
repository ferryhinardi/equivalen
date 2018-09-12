import R from 'ramda';

export const setPageList = (totalPages, answers) => {
  const pageList = [];

  for (let i = 1; i <= totalPages; i++) {
    const mappingAnswer = {
      no: ('0' + i).slice(-2),
      answer: R.pathOr('', [i, 'answer'], answers),
      isDoubt: R.pathOr(false, [i, 'isDoubt'], answers),
    };
    pageList.push(mappingAnswer);
  }

  return pageList;
};

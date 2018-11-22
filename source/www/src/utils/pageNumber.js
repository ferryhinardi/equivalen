import get from 'lodash/get';

export const setPageList = (totalPages, answers) => {
  const pageList = [];

  for (let i = 1; i <= totalPages; i++) {
    const mappingAnswer = {
      no: ('0' + i).slice(-2),
      answer: get(answers, `${i}.answer`, ''),
      isDoubt: get(answers, `${i}.isDoubt`, false),
    };
    pageList.push(mappingAnswer);
  }

  return pageList;
};

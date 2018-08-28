export const setPageList = (totalPages, answers) => {
  const pageList = [];

  for (let i = 1; i <= totalPages; i++) {
    const mappingAnswer = {no: ('0' + i).slice(-2), answer: answers[i] || ''};
    pageList.push(mappingAnswer);
  }

  return pageList;
};

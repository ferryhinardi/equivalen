export const setPageList = (totalPages, answers) => {
  const pageList = [];

  for (let i = 1; i <= totalPages; i++) {
    const mappingAnswer = {no: i, answer: answers[i] || '-'};
    pageList.push(mappingAnswer);
  }

  return pageList;
};

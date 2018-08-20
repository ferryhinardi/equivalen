export const validationAns = (solution, answer) => {
  let correct = 0;
  let wrong = 0;
  let empty = 0;
  solution.forEach((ans, idx) => {
    const currentNo = idx + 1;

    if (answer[currentNo]) { // ${currentNo} is answered
      if (ans.toLowerCase() === answer[currentNo].toLowerCase()) { // Correct Answer
        correct += 1;
      } else {
        wrong += 1;
      }
    } else {
      empty += 1;
    }
  });

  return {correct, wrong, empty};
};

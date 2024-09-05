import pdf from 'pdf-parse';

export const converterPDFToJson = (bufferFile) => {
  return new Promise((resolve, reject) => {
    pdf(bufferFile).then((data) => {
      // splitting text into lines
      const lines = data.text.split("\n");

      const questions = [];
      let currentQuestion = null;

      lines.forEach((line) => {
        const mcqQuestionRegex = /^\d+\.\s*(.*)$/; // for questions like "1. What is...?"
        const choiceLetterRegex = /^\([a-zA-Z]\)\s*(.*)$/; // for choices like "(a) option" or "(A) option"
        const choiceLetterNoParenthesesRegex = /^[a-zA-Z]\)\s*(.*)$/; // for choices like "a) option" or "A) option"
        const choiceNumberRegex = /^\((i|ii|iii|iv)\)\s*(.*)$/; // for choices like "(i) option" or "(iv) option"
        const choiceNumberNoParenthesesRegex = /^\d\)\s*(.*)$/; // for choices like "1) option"
        const normalQuestionRegex = /^\d+\.\s*(.*)$/; // for normal questions

        if (mcqQuestionRegex.test(line)) {
          if (currentQuestion) {
            currentQuestion.type = currentQuestion.choices.length > 0 ? 'MCQ' : 'theory';
            questions.push(currentQuestion);
          }
          const match = mcqQuestionRegex.exec(line);
          currentQuestion = {
            question: match[1].trim(),
            choices: []
          };
        } else if ((choiceLetterRegex.test(line) || choiceLetterNoParenthesesRegex.test(line) || choiceNumberRegex.test(line) || choiceNumberNoParenthesesRegex.test(line)) && currentQuestion) {
          const matchLetter = choiceLetterRegex.exec(line);
          const matchLetterNoParentheses = choiceLetterNoParenthesesRegex.exec(line);
          const matchNumber = choiceNumberRegex.exec(line);
          const matchNumberNoParentheses = choiceNumberNoParenthesesRegex.exec(line);

          if (matchLetter) {
            currentQuestion.choices.push({
              choice: matchLetter[1].trim(),
              label: line.match(/^\([a-zA-Z]\)/)[0].replace(/\(|\)/g, '')
            });
          } else if (matchLetterNoParentheses) {
            currentQuestion.choices.push({
              choice: matchLetterNoParentheses[1].trim(),
              label: line[0]
            });
          } else if (matchNumber) {
            currentQuestion.choices.push({
              choice: matchNumber[2].trim(),
              label: matchNumber[1]
            });
          } else if (matchNumberNoParentheses) {
            currentQuestion.choices.push({
              choice: matchNumberNoParentheses[1].trim(),
              label: line[0]
            });
          }
        } else if (normalQuestionRegex.test(line)) {
          if (currentQuestion) {
            currentQuestion.type = currentQuestion.choices.length > 0 ? 'MCQ' : 'theory';
            questions.push(currentQuestion);
          }
          const match = normalQuestionRegex.exec(line);
          currentQuestion = {
            question: match[1].trim(),
            choices: []
          };
        }
      });

      if (currentQuestion) {
        currentQuestion.type = currentQuestion.choices.length > 0 ? 'MCQ' : 'theory';
        questions.push(currentQuestion);
      }

      resolve(questions);
    }).catch(reject);
  });
}

import mammoth from 'mammoth';

export const converterDOCXToJson = (bufferFile) => {
  return new Promise((resolve, reject) => {
    mammoth.extractRawText({ buffer: bufferFile })
      .then((result) => {
        // splitting text into lines
        const lines = result.value.split("\n");

        const questions = [];
        let currentQuestion = null;

        lines.forEach((line) => {
          // using regex to identify choices
          const mcqQuestionRegex = /^\d+\.\s*(.*)$/; // for questions like "1. What is...?"
          const choiceLetterRegex = /^\([a-zA-Z]\)\s*(.*)$/; // for choices like "(a) option" or "(A) option"
          const choiceLetterNoParenthesesRegex = /^[a-zA-Z]\)\s*(.*)$/; // for choices like "a) option" or "A) option"
          const choiceNumberRegex = /^\((i|ii|iii|iv)\)\s*(.*)$/; // for choices like "(i) option" or "(iv) option"
          const choiceNumberNoParenthesesRegex = /^\d\)\s*(.*)$/; // for choices like "1) option"
          const normalQuestionRegex = /^\d+\.\s*(.*)$/; // for normal questions

          if (mcqQuestionRegex.test(line)) {
            // saving the previous ques if it exists
            if (currentQuestion) {
              // set type based on whether choices are present or not
              currentQuestion.type = currentQuestion.choices.length > 0 ? 'MCQ' : 'theory';
              questions.push(currentQuestion);
            }
            // new MCQ question
            const match = mcqQuestionRegex.exec(line);
            currentQuestion = {
              question: match[1].trim(),
              choices: []
            };
          } else if ((choiceLetterRegex.test(line) || choiceLetterNoParenthesesRegex.test(line) || choiceNumberRegex.test(line) || choiceNumberNoParenthesesRegex.test(line)) && currentQuestion) {
            // adding choice to the current ques
            const matchLetter = choiceLetterRegex.exec(line);
            const matchLetterNoParentheses = choiceLetterNoParenthesesRegex.exec(line);
            const matchNumber = choiceNumberRegex.exec(line);
            const matchNumberNoParentheses = choiceNumberNoParenthesesRegex.exec(line);

            if (matchLetter) {
              currentQuestion.choices.push({
                choice: matchLetter[1].trim(),
                label: line.match(/^\([a-zA-Z]\)/)[0].replace(/\(|\)/g, '') // Capture choice label 'a', 'b', etc.
              });
            } else if (matchLetterNoParentheses) {
              currentQuestion.choices.push({
                choice: matchLetterNoParentheses[1].trim(),
                label: line[0] // capturing choice label 'a', 'b', etc.
              });
            } else if (matchNumber) {
              currentQuestion.choices.push({
                choice: matchNumber[2].trim(),
                label: matchNumber[1] // capturing choice label 'i', 'ii', etc.
              });
            } else if (matchNumberNoParentheses) {
              currentQuestion.choices.push({
                choice: matchNumberNoParentheses[1].trim(),
                label: line[0] // capturing choice label '1', '2', etc.
              });
            }
          } else if (normalQuestionRegex.test(line)) {
            // saving the previous question if it exists
            if (currentQuestion) {
              // setting type based on whether choices are present or not
              currentQuestion.type = currentQuestion.choices.length > 0 ? 'MCQ' : 'theory';
              questions.push(currentQuestion);
            }
            // new normal question
            const match = normalQuestionRegex.exec(line);
            currentQuestion = {
              question: match[1].trim(),
              choices: [] // choices are null or empty for theory questions
            };
          }
        });

        // Save the last question
        if (currentQuestion) {
          // setting type based on whether choices are present or not
          currentQuestion.type = currentQuestion.choices.length > 0 ? 'MCQ' : 'theory';
          questions.push(currentQuestion);
        }

        resolve(questions);
      })
      .catch(reject);
  });
};
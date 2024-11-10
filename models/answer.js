const db = require('../database/config');
const QUERIES = require('../utils/queries'); //import all sql queries

const Answer = {
    submit: (user_id, question_id, selected_option, callback) => {
      db.get(QUERIES.getQuestionById, [question_id], (err, row) => {
        if (err) return callback(err);
        
        if (!row) {
          console.error("No question found with this ID");
          return callback(new Error("Question not found for ID: " + question_id));
        }
      
        const isCorrect = row.correct_option === selected_option;
  
        db.run(
          QUERIES.addAnswerForUser,
          [user_id, question_id, selected_option, isCorrect],
          function (err) {
            if (err) return callback(err);
            callback(null, { isCorrect, correctAnswer: isCorrect ? null : row.correct_option });
          }
        );
      });
    },
  };
  
  module.exports = Answer;
  
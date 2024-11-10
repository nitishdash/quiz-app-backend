const db = require('../database/config');
const CustomError = require('../utils/CustomError');
const QUERIES = require('../utils/queries'); //import all sql queries

const Answer = {
    submit: (user_id, question_id, selected_option, callback) => {
      db.get(QUERIES.getQuestionById, [question_id], (err, row) => {
        if (err) return callback(err);
        
        if (!row) {
          return callback(new CustomError(`Question not found for question_id: ${question_id}`, 404), null);
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
  
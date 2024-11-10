const db = require('../database/config');
const QUERIES = require('../utils/queries');

const Result = {
    getByQuizAndUser: (quiz_id, user_id, callback) => {
      db.all(QUERIES.getUserQuizAnswers, [quiz_id, user_id], (err, rows) => {
          if (err) return callback(err);
  
          const correctAnswers = rows.filter((row) => row.is_correct).length;
          const score = "" + (correctAnswers / rows.length) * 100 + "%"; //expressing score for a quiz as a percentage
  
          db.run(QUERIES.updateUserScore, [quiz_id, user_id, score], function (err) {
              if (err) return callback(err);

              callback(null, {
                score,
                quizId: quiz_id,
                userId: user_id,
                answers: rows.map((row) => row.selected_option),
                summary: rows.map((row) => ({
                  question_id: row.question_id,
                  selected_option: row.selected_option,
                  correct_answer: row.correct_option,
                  is_correct: Boolean(row.is_correct),
                })),
              });
            }
          );
        }
      );
    },
  };
  
  module.exports = Result;
  
const db = require('../database/config');

// const Answer = {
//   submit: (question_id, selected_option, callback) => {
//     db.get(`SELECT correct_option FROM questions WHERE id = ?`, [question_id], (err, row) => {
//       if (err) return callback(err);

//       const isCorrect = row.correct_option === selected_option;

//       db.run(
//         `INSERT INTO answers (question_id, selected_option, is_correct) VALUES (?, ?, ?)`,
//         [question_id, selected_option, isCorrect],
//         function (err) {
//           if (err) return callback(err);
//           callback(null, { isCorrect, correctAnswer: isCorrect ? null : row.correct_option });
//         }
//       );
//     });
//   },
// };

// module.exports = Answer;

const Answer = {
    submit: (user_id, question_id, selected_option, callback) => {
      db.get(`SELECT correct_option FROM questions WHERE id = ?`, [question_id], (err, row) => {
        if (err) return callback(err);
  
        const isCorrect = row.correct_option === selected_option;
  
        db.run(
          `INSERT INTO answers (user_id, question_id, selected_option, is_correct) VALUES (?, ?, ?, ?)`,
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
  
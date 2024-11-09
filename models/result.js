const db = require('../database/config');

// const Result = {
//   getByQuizAndUser: (quiz_id, user_id, callback) => {
//     db.all(
//       `SELECT answers.question_id, answers.selected_option, answers.is_correct, questions.correct_option 
//        FROM answers 
//        JOIN questions ON answers.question_id = questions.id 
//        WHERE questions.quiz_id = ?`,
//       [quiz_id],
//       (err, rows) => {
//         if (err) return callback(err);

//         const correctAnswers = rows.filter((row) => row.is_correct).length;
//         const score = (correctAnswers / rows.length) * 100;

//         db.run(
//           `INSERT INTO results (quiz_id, user_id, score) VALUES (?, ?, ?)`,
//           [quiz_id, user_id, score],
//           function (err) {
//             if (err) return callback(err);
//             callback(null, {
//               score,
//               summary: rows.map((row) => ({
//                 question_id: row.question_id,
//                 selected_option: row.selected_option,
//                 is_correct: row.is_correct,
//                 correct_answer: row.correct_option,
//               })),
//             });
//           }
//         );
//       }
//     );
//   },
// };

// module.exports = Result;

const Result = {
    getByQuizAndUser: (quiz_id, user_id, callback) => {
      db.all(
        `SELECT answers.question_id, answers.selected_option, answers.is_correct, questions.correct_option 
         FROM answers 
         JOIN questions ON answers.question_id = questions.id 
         WHERE questions.quiz_id = ? AND answers.user_id = ?`,
        [quiz_id, user_id],
        (err, rows) => {
          if (err) return callback(err);
  
          const correctAnswers = rows.filter((row) => row.is_correct).length;
          const score = (correctAnswers / rows.length) * 100;
  
          db.run(
            `INSERT OR REPLACE INTO results (quiz_id, user_id, score) VALUES (?, ?, ?)`,
            [quiz_id, user_id, score],
            function (err) {
              if (err) return callback(err);
              callback(null, {
                score,
                summary: rows.map((row) => ({
                  question_id: row.question_id,
                  selected_option: row.selected_option,
                  is_correct: row.is_correct,
                  correct_answer: row.correct_option,
                })),
              });
            }
          );
        }
      );
    },
  };
  
  module.exports = Result;
  
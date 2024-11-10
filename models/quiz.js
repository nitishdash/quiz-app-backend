const db = require('../database/config');

const Quiz = {
  create: (title, questions, callback) => {
    db.run(`INSERT INTO quizzes (title) VALUES (?)`, [title], function (err) {
      if (err) return callback(err);
      const quizId = this.lastID;

      questions.forEach((question) => {
        db.run(`INSERT INTO questions (quiz_id, text, correct_option) VALUES (?, ?, ?)`, [quizId, question.text, question.correct_option], function (err) {
          if (err) return callback(err);
          const questionId = this.lastID;

          question.options.forEach((option, index) => {
            db.run(`INSERT INTO options (question_id, text, option_index) VALUES (?, ?, ?)`, [questionId, option, index]);
          });
          console.log("QUIZ CREATED")
        });
      });
      callback(null, quizId);
    });
  },

getById: (id, callback) => {
    db.all(
      `SELECT quizzes.title AS quiz_title, 
              questions.id AS question_id, 
              questions.text AS question_text, 
              options.text AS option_text, 
              options.option_index 
       FROM questions 
       JOIN options ON questions.id = options.question_id 
       JOIN quizzes ON questions.quiz_id = quizzes.id 
       WHERE questions.quiz_id = ?`,
      [id],
      (err, rows) => {
        if (err) return callback(err);
  
        if (rows.length === 0) return callback(null, null);
  
        const quizTitle = rows[0].quiz_title;
  
        const questions = rows.reduce((acc, row) => {
          const question = acc.find((q) => q.id === row.question_id);
          if (question) {
            question.options.push({ text: row.option_text, index: row.option_index });
          } else {
            acc.push({
              id: row.question_id,
              text: row.question_text,
              options: [{ text: row.option_text, index: row.option_index }],
            });
          }
          return acc;
        }, []);
  
        callback(null, { quizId: id, quizTitle, questions });
      }
    );
  },

};


  

module.exports = Quiz;

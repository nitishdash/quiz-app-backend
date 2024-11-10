const db = require('../database/config');
const CustomError = require('../utils/CustomError');
const QUERIES = require('../utils/queries'); //import all sql queries

const Quiz = {
  create: (title, questions, callback) => {
    db.run(QUERIES.createQuizWithTitle, [title], function (err) {
      if (err) return callback(err);

      const quizId = this.lastID;

      questions.forEach((question) => {
        db.run(QUERIES.addQuestionsToTable, [quizId, question.text, question.correct_option], function (err) {
          if (err) return callback(err);
          const questionId = this.lastID;

          question.options.forEach((option, index) => {
            db.run(QUERIES.insertOptionsForQuestion, [questionId, option, index]);
          });
          
        });
      });
      console.log("QUIZ CREATED SUCCESSFULLY")
      callback(null, quizId);
    });
  },

getById: (id, callback) => {
    db.all(
      QUERIES.getQuizById,
      [id],
      (err, rows) => {
        if (err) return callback(err); //for database related error, pass generic error message
        
        //No quiz found with provided id
        if (rows.length === 0) {
          return callback(new CustomError(`No quiz found with the provided id: ${id}`, 404), null);
        }
  
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

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Initialize tables
db.serialize(() => {
  db.run(`CREATE TABLE quizzes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)`);
  db.run(`CREATE TABLE questions (id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_id INTEGER, text TEXT, correct_option INTEGER, FOREIGN KEY(quiz_id) REFERENCES quizzes(id))`);
  db.run(`CREATE TABLE options (id INTEGER PRIMARY KEY AUTOINCREMENT, question_id INTEGER, text TEXT, option_index INTEGER, FOREIGN KEY(question_id) REFERENCES questions(id))`);
  db.run(`CREATE TABLE answers (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, question_id INTEGER, selected_option INTEGER, is_correct BOOLEAN)`);
  db.run(`CREATE TABLE results (id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_id INTEGER, user_id INTEGER, score INTEGER, FOREIGN KEY(quiz_id) REFERENCES quizzes(id))`);
});

module.exports = db;
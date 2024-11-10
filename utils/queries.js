const QUERIES = {
    getQuestionById : `SELECT correct_option FROM questions WHERE id = ?;`,
    addAnswerForUser : `INSERT INTO answers (user_id, question_id, selected_option, is_correct) VALUES (?, ?, ?, ?)`,
    createQuizWithTitle : `INSERT INTO quizzes (title) VALUES (?)`,
    addQuestionsToTable : `INSERT INTO questions (quiz_id, text, correct_option) VALUES (?, ?, ?)`,
    insertOptionsForQuestion : `INSERT INTO options (question_id, text, option_index) VALUES (?, ?, ?)`,
    getQuizById: `SELECT quizzes.title AS quiz_title, 
                    questions.id AS question_id, 
                    questions.text AS question_text, 
                    options.text AS option_text, 
                    options.option_index 
                    FROM questions 
                    JOIN options ON questions.id = options.question_id 
                    JOIN quizzes ON questions.quiz_id = quizzes.id 
                    WHERE questions.quiz_id = ?`,
    getUserQuizAnswers: `SELECT answers.question_id, answers.selected_option, answers.is_correct, questions.correct_option 
                        FROM answers 
                        JOIN questions ON answers.question_id = questions.id 
                        WHERE questions.quiz_id = ? AND answers.user_id = ?`,
    updateUserScore: `INSERT OR REPLACE INTO results (quiz_id, user_id, score) VALUES (?, ?, ?)`
};

module.exports = QUERIES;

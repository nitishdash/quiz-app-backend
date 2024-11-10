const request = require('supertest');
const app = require('../../app'); 
const db = require('../../database/config')

describe('Quiz API Integration Tests', () => {
  let quizId;
  let questionId;

  //Delete all tables in DB and recreate the structure before tests:
  beforeAll((done) => {
    db.serialize(() => {
      db.run(`DROP TABLE IF EXISTS quizzes`);
      db.run(`DROP TABLE IF EXISTS questions`);
      db.run(`DROP TABLE IF EXISTS options`);
      db.run(`DROP TABLE IF EXISTS answers`);
      db.run(`DROP TABLE IF EXISTS results`);

      // Recreate all the tables
      db.run(`CREATE TABLE quizzes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)`);
      db.run(`CREATE TABLE questions (id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_id INTEGER, text TEXT, correct_option INTEGER, FOREIGN KEY(quiz_id) REFERENCES quizzes(id))`);
      db.run(`CREATE TABLE options (id INTEGER PRIMARY KEY AUTOINCREMENT, question_id INTEGER, text TEXT, option_index INTEGER, FOREIGN KEY(question_id) REFERENCES questions(id))`);
      db.run(`CREATE TABLE answers (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, question_id INTEGER, selected_option INTEGER, is_correct BOOLEAN)`);
      db.run(`CREATE TABLE results (id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_id INTEGER, user_id INTEGER, score INTEGER, FOREIGN KEY(quiz_id) REFERENCES quizzes(id))`);
      
      done();
    });
  });

  afterAll((done) => {
    db.close(done);
  });

  // TEST 1: Create new Quiz
  test('should create a new quiz', async () => {
    const response = await request(app)
      .post('/quiz/create')
      .send({
        title: 'Integration Test Quiz',
        questions: [
          { text: 'What is 10+20?', options: ['30', '40', '50', '60'], correct_option: 0 }
        ]
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('quizId');
    quizId = response.body.quizId;
    console.log("QuizID: " + quizId);
  });

  // TEST 2: Get the added quiz via ID
  test('should get a quiz by ID without revealing correct answers', async () => {
    const response = await request(app).get(`/quiz/${quizId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('questions');
    response.body.questions.forEach((question) => {
      expect(question).not.toHaveProperty('correct_option'); //to ensure that we don't reveal the correct answer
    });
    //store a question id for use in the further tests
    questionId = response.body.questions[0].id;
    await new Promise(resolve => setTimeout(resolve, 50));
  });

  const userId = 1;

  //TEST 3: Emulate user hitting the endpoint and submitting the answer
  test('should submit an answer and return correct/incorrect feedback', async () => {
    const response = await request(app)
      .post('/answer/submit')
      .send({
        user_id: userId,
        question_id: questionId,
        selected_option: 0
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('isCorrect', true);
  }, 5000);

  //TEST 4: Emulate user hitting the endpoint and submitting the incorrect answer
  test('should return feedback with the correct answer for incorrect submission', async () => {
    const response = await request(app)
      .post('/answer/submit')
      .send({
        user_id: userId,
        question_id: questionId,
        selected_option: 1
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('isCorrect', false);
    expect(response.body).toHaveProperty('correctAnswer', 0);
  });

});

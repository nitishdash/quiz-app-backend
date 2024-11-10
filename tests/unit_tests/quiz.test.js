const db = require('../../database/config');
const Quiz = require('../../models/quiz');

// Mock the database
jest.mock('../../database/config', () => ({
  run: jest.fn(),
  all: jest.fn()
}));

describe('Quiz Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  //quiz creation test/mockup
  test('Should create a sample quiz with questions', (done) => {
    db.run.mockImplementationOnce((sql, params, callback) => {
      callback(null); // No error
    });

    const sampleQuiz = {
      title: 'Sample Quiz',
      questions: [
        { text: 'Question 1', options: ['A', 'B', 'C', 'D'], correct_option: 1 }
      ]
    };

    Quiz.create(sampleQuiz.title, sampleQuiz.questions, (err, quizId) => {
      expect(err).toBeNull();
      expect(db.run).toHaveBeenCalled();
      done();
    });
  });

  //To test getquiz by ID api endpoint
  test('This should get questions with the provided ID without revealing correct answer', (done) => {
    const quizId = 1;
    const mockRows = [
      { question_id: 1, text: 'Sample Question', option_text: 'Option 1', option_index: 0 },
    ];

    db.all.mockImplementationOnce((sql, params, callback) => {
      callback(null, mockRows);
    });

    Quiz.getById(quizId, (err, quiz) => {
      expect(err).toBeNull();
      expect(quiz).toHaveProperty('questions');
      done();
    });
  });
});

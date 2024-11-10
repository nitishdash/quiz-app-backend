const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');
const CustomError = require('../utils/CustomError');
const InputValidator = require('../utils/InputValidator');

//Create quiz endpoint
router.post('/create', (req, res) => {
  const { title, questions } = req.body;

  //Run validations for input without checking DB
  const validator = new InputValidator({ title, questions });
  if (!validator.validateCreateQuiz()) {
    return res.status(validator.getStatusCode()).json({ errors: validator.getErrors() });
  }

  //if there are no validation errors, proceed  
  Quiz.create(title, questions, (err, quizId) => {
    if (err) {
      const statusCode = err instanceof CustomError ? err.statusCode : 500;
      return res.status(statusCode).json({ error: err.message });
    }
    return res.status(201).json({ message: `Successfully created quiz`, quizId });
  });
});

//Get quiz endpoint
router.get('/:id', (req, res) => {
  const quizId = req.params.id;
  
  //Run validations for input without checking DB
  const validator = new InputValidator({ quizId });
  validator.validateQuizId();

  if (validator.getErrors().length > 0) {
    return res.status(validator.getStatusCode()).json({ errors: validator.getErrors() });
  }

  Quiz.getById(quizId, (err, quiz) => {
    if (err) {
      const statusCode = err instanceof CustomError ? err.statusCode : 500;
      return res.status(statusCode).json({ error: err.message });
    }
    res.json(quiz);
  });
});

module.exports = router;
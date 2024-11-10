const express = require('express');
const router = express.Router();
const Answer = require('../models/answer');
const Result = require('../models/result');
const CustomError = require('../utils/CustomError');
const InputValidator = require('../utils/InputValidator');


// Submit answer endpoint
router.post('/submit', (req, res) => {
    const { user_id, question_id, selected_option } = req.body;

    // Run validations
  const validator = new InputValidator({ user_id, question_id, selected_option });
  validator.validateSubmitAnswer();
  if (validator.getErrors().length > 0) {
    return res.status(validator.getStatusCode()).json({ errors: validator.getErrors() });
  }

    // Proceed with DB operations if there is no validation errors
    Answer.submit(user_id, question_id, selected_option, (err, result) => {
      if (err) {
        const statusCode = err instanceof CustomError ? err.statusCode : 500;
        return res.status(statusCode).json({ error: err.message });
      }
      res.json(result);
    });
  });
  

// Get results endpoint
router.get('/results/:quiz_id/:user_id', (req, res) => {
  const { quiz_id, user_id } = req.params;

  // Run validations
  const validator = new InputValidator({ quiz_id, user_id });
  validator.validateResults();
  if (validator.getErrors().length > 0) {
    return res.status(validator.getStatusCode()).json({ errors: validator.getErrors() });
  }

  // Proceed with DB operations if there is no validation errors
  Result.getByQuizAndUser(quiz_id, user_id, (err, results) => {
    if (err) {
      const statusCode = err instanceof CustomError ? err.statusCode : 500;
      return res.status(statusCode).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Answer = require('../models/answer');
const Result = require('../models/result');

// router.post('/submit', (req, res) => {
//   const { question_id, selected_option } = req.body;
//   Answer.submit(question_id, selected_option, (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(result);
//   });
// });

router.post('/submit', (req, res) => {
    const { user_id, question_id, selected_option } = req.body;
    Answer.submit(user_id, question_id, selected_option, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    });
  });
  

router.get('/results/:quiz_id/:user_id', (req, res) => {
  const { quiz_id, user_id } = req.params;
  Result.getByQuizAndUser(quiz_id, user_id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;

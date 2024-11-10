const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');

//Create quiz endpoint
router.post('/create', (req, res) => {
  const { title, questions } = req.body;
  Quiz.create(title, questions, (err, quizId) => {
    if (err) return res.status(500).json({ error: err.message });
    else return res.status(201).json({ message: `Sucessfully created quiz`, quizId});
  });
});

//Get quiz endpoint
router.get('/:id', (req, res) => {
  const quizId = req.params.id;
  Quiz.getById(quizId, (err, quiz) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(quiz);
  });
});

module.exports = router;
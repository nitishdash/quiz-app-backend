const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/config');
const quizRoutes = require('./routes/quizRoutes');
const answerRoutes = require('./routes/answerRoutes');
const env = require('dotenv');
const path = require('path');

//environment config
env.config({
    override: true,
    path : path.join('./', 'DEV.env')
});

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/quiz', quizRoutes);
app.use('/answer', answerRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

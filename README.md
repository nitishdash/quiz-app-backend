# Quiz App Backend

A quiz application built with Node.js, Express, and SQLite3 (in-memory). 
The app allows users to create quizzes, fetch quizzes, submit answers, and check the result as a percentage of correct answers.

## Features

- User can take quizzes with multiple-choice questions
- Check the scores for a quiz
- REST API endpoints for managing quizzes and user scores
- Utilises proper code formatting, follows proper variable naming conventions, addresses separation of concerns.
- Code is well commented and documented too.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite3 [In-Memory]
- **Containerization**: Docker
- **API Client**: Insomnia/Postman

## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Node.js (for local development)

### Clone the repository

```bash
git clone https://github.com/nitishdash/quiz-app-backend.git
cd quiz-app-backend
```

### Start the application

```
docker-compose build --no-cache
docker-compose up
```

The application will be exposed on localhost:3000/

### To test the app:
```
npm test
```

This should start the test scripts. There are 6 test cases.

### API Endpoints

- **POST** /quiz/create | Create a new quiz
- **GET** /quiz/:id | Fetch quiz with provided id
- **POST** /answer/submit | Submit a response provided by the user for a question
- **GET** /answer/results | Get the answers provided by the user alongwith a detailed summary

### Insomnia & Postman collections

The provided Insomnia collection or Postman collection can be used to test the endpoints.
 
- Download the Collection -> [Google Drive](https://drive.google.com/drive/folders/1Nmi7GfTs2du3EcSDoUpEsYLCS7kaSRtq?usp=drive_link)
- Import the collection into Insomnia/Postman
- Make requests to the API.



class InputValidator {
    constructor(data) {
      this.data = data;
      this.errors = [];
    }
  
    isRequired(field) {
      if (this.data[field] === undefined || this.data[field] === null || this.data[field].toString().trim() === '') {
        this.errors.push({ field, message: `${field} is required`, statusCode: 400 });
      }
    }

    isOfType(field, type) {
      if (typeof this.data[field] !== type) {
        this.errors.push({ field, message: `${field} must be of type ${type}`, statusCode: 400 });
      }
    }

    isArray(field) {
      if (!Array.isArray(this.data[field])) {
        this.errors.push({ field, message: `${field} must be an array`, statusCode: 400 });
      }
    }

    isInteger(field) {
      if (!Number.isInteger(Number(this.data[field]))) {
        this.errors.push({ field, message: `${field} must be an integer`, statusCode: 400 });
      }
    }
  
    // Validate that each question has exactly four options
    validateOptionsCount() {
      if (!Array.isArray(this.data.questions)) return;
      this.data.questions.forEach((question, index) => {
        if (!question.options || question.options.length !== 4) {
          this.errors.push({
            field: `questions[${index}].options`,
            message: `Each question must have exactly 4 options`,
            statusCode: 422,
          });
        }
      });
    }
  
    validateCreateQuiz() {
      this.isRequired('title');
      this.isOfType('title', 'string');
      this.isRequired('questions');
      this.isArray('questions');
      this.validateOptionsCount();
      return this.errors.length === 0;
    }
    
    validateQuizId() {
      this.isRequired('quizId');
      this.isInteger('quizId');
    }

    validateSubmitAnswer() {
      this.isRequired('user_id');
      this.isInteger('user_id');
      this.isRequired('question_id');
      this.isInteger('question_id');
      this.isRequired('selected_option');
      this.isInteger('selected_option');
    }

    validateResults() {
      this.isRequired('quiz_id');
      this.isInteger('quiz_id');
      this.isRequired('user_id');
      this.isInteger('user_id');
    }
  
    getErrors() {
      return this.errors;
    }
  
    // Return the highest priority status code from the errors, defaulting to 400 if there's no error
    getStatusCode() {
      return this.errors.length ? Math.max(...this.errors.map(err => err.statusCode || 400)) : 400;
    }
  }
  
  module.exports = InputValidator;
  
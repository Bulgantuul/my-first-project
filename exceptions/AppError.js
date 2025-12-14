// exceptions/AppError.js

class AppError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  toJson() {
    return {
      error: this.name.replace(/([A-Z])/g, " $1").trim(),
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}

class ValidationError extends AppError {
  constructor(message = "Өгөгдлийн баталгаажуулалтын алдаа.", details) {
    super(message, 400, details);
  }
}

module.exports = {
  AppError,
  ValidationError,
};

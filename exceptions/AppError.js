// exceptions/AppError.js

/**
 * Custom App Error-ийн үндсэн класс.
 * Бусад бүх алдаанууд үүнээс өвлөнө.
 */
class AppError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    // Stack trace-ийг зөв авах (Node.js-д чухал)
    Error.captureStackTrace(this, this.constructor);
  }

  toJson() {
    return {
      error: this.name.replace(/([A-Z])/g, " $1").trim(), // Жишээ нь: 'ValidationError' -> 'Validation Error'
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}

/**
 * Хэрэглэгчийн оруулсан өгөгдөл буруу үед үүсгэх алдаа (400 Bad Request).
 */
class ValidationError extends AppError {
  constructor(message = "Өгөгдлийн баталгаажуулалтын алдаа.", details) {
    super(message, 400, details);
  }
}

/**
 * Хайсан нөөц олдсонгүй (404 Not Found).
 */
class NotFoundError extends AppError {
  constructor(resource, id) {
    const message = `${resource} ID: ${id} олдсонгүй.`;
    super(message, 404);
  }
}

module.exports = {
  AppError,
  ValidationError,
  NotFoundError,
};

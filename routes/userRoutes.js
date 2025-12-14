const express = require("express");
const router = express.Router();
const UserService = require("../services/UserService");
const { AppError } = require("../exceptions/AppError"); // Алдааг барьж авах үндсэн класс

// Алдааг барьж авах Middleware/Wrapper (Lab 9-д заасан загвар)
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// POST /api/register - Хэрэглэгч бүртгүүлэх
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;

    const newUser = await UserService.registerUser(username, password, email);

    // 201 Created статус код буцаах
    res.status(201).json({
      message: "Хэрэглэгч амжилттай бүртгэгдлээ.",
      user: newUser,
    });
  })
);

// Алдааг зохицуулах Middleware
router.use((err, req, res, next) => {
  if (err instanceof AppError) {
    // Custom AppError-ийг JSON хэлбэрээр буцаах
    return res.status(err.statusCode).json(err.toJson());
  }
  // Системийн бусад алдаа
  console.error(err.stack);
  res
    .status(500)
    .json({
      error: "Дотоод Серверийн Алдаа",
      message: "Бидний зүгээс алдаа гарлаа.",
    });
});

module.exports = router;

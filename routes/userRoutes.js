// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const UserService = require("../services/UserService");
const { AppError } = require("../exceptions/AppError");

// Асинхрон функцийг wrapper хийж, алдааг next() рүү дамжуулах
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// POST /api/register - Бүртгэл үүсгэх
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;

    const newUser = await UserService.registerUser(username, password, email);

    res.status(201).json({
      message: "Хэрэглэгч амжилттай бүртгэгдлээ.",
      user: newUser,
    });
  })
);

// Алдааг зохицуулах Middleware (AppError болон бусад алдааг барих)
router.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(err.toJson());
  }

  // Системийн алдаа
  console.error(err.stack);
  res
    .status(500)
    .json({
      error: "Дотоод Серверийн Алдаа",
      message: "Бидний зүгээс алдаа гарлаа.",
      statusCode: 500,
    });
});

module.exports = router;

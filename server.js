// server.js

const express = require("express");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const { AppError } = require("./exceptions/AppError");
const path = require("path"); // Статик файл түгээхэд шаардлагатай

const app = express();
const PORT = 3000;

// 1. Middleware-ууд
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());

// 2. Front-end статик файлуудыг түгээх (Lab 11)
// public хавтас доторх index.html, CSS, JS-ийг http://localhost:3000/ хаягаар нээх боломжтой болгоно
app.use(express.static(path.join(__dirname, "public")));

// 3. API Routes
app.use("/api", userRoutes);

// 4. Үндсэн алдаа барьж авах Middleware
app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(err.toJson());
  }

  console.error("CRITICAL SERVER ERROR:", err.stack);
  res.status(500).json({
    error: "Дотоод Серверийн Алдаа",
    message: "Бидний зүгээс алдаа гарлаа.",
    statusCode: 500,
  });
});

// 5. Server-ийг эхлүүлэх
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`Front-end: http://localhost:${PORT}/index.html`);
});

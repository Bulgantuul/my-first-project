const request = require("supertest");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const UserService = require("./services/UserService");

// Тестийн Express аппликейшнийг үүсгэх
const app = express();
app.use(express.json()); // JSON body-г ашиглах
app.use("/api", userRoutes); // Бүх хэрэглэгчийн API-г холбох

describe("US-01: User Registration Integration Test", () => {
  // Тест бүрийн дараа DB-г цэвэрлэх
  afterEach(() => {
    UserService.clearUsers();
  });

  // 1. Амжилттай бүртгэлийг шалгах тест
  test("POST /api/register - Should register a new user successfully (201)", async () => {
    const userData = {
      username: "TestUser",
      password: "securePassword123",
      email: "test@example.com",
    };

    const response = await request(app)
      .post("/api/register") // API руу хүсэлт илгээх
      .send(userData)
      .expect(201); // Статус код 201 байх ёстой

    // Хариу зөв бүтэцтэй эсэхийг шалгах
    expect(response.body.message).toBe("Хэрэглэгч амжилттай бүртгэгдлээ.");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.email).toBe("test@example.com");
    // Нууц үг буцаж ирээгүй эсэхийг шалгах (Аюулгүй байдал)
    expect(response.body.user).not.toHaveProperty("password");
  });

  // 2. Validation алдааг шалгах тест
  test("POST /api/register - Should return 400 for missing password", async () => {
    const userData = {
      username: "BadUser",
      email: "bad@example.com",
      // password байхгүй
    };

    const response = await request(app)
      .post("/api/register")
      .send(userData)
      .expect(400); // Статус код 400 байх ёстой (Validation Error)

    // Хариу нь Custom Error-ын форматаар ирсэн эсэхийг шалгах
    expect(response.body.statusCode).toBe(400);
    expect(response.body.error).toBe("Validation Error");
  });
});

// services/UserService.js

const bcrypt = require("bcrypt");
const { ValidationError } = require("../exceptions/AppError");

// In-Memory Database (Загварчилсан)
const users = [];
let nextId = 1;

class UserService {
  static async registerUser(username, password, email) {
    // Validation
    if (!username || !password || !email) {
      throw new ValidationError("Бүх талбарыг бөглөнө үү.");
    }

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      throw new ValidationError("Энэ имэйл хаяг бүртгэлтэй байна.");
    }

    // Нууц үгийг Hash хийх
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: nextId++,
      username,
      email,
      password: hashedPassword,
    };

    users.push(newUser);

    // Нууц үгийг буцаахгүй байх
    const { password: _, ...userData } = newUser;
    return userData;
  }

  // *** ШИНЭ ФУНКЦ: Тестийн зорилгоор өгөгдлийг цэвэрлэнэ ***
  static clearUsers() {
    // users массивыг хоослох
    users.length = 0;
    nextId = 1; // ID-г эхнээс нь эхлүүлэх
  }

  // *** Нэмэлт: Хэрэглэгч олох функц (тестүүдэд хэрэгтэй байж болно) ***
  static findByEmail(email) {
    return users.find((u) => u.email === email);
  }
}

module.exports = UserService;

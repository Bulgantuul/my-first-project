const bcrypt = require("bcrypt");
const { ValidationError } = require("../exceptions/AppError"); // Lab 9-ийн алдааг ашиглах

// In-Memory Database (DB-ийг загварчилсан)
const users = [];
let nextId = 1;

class UserService {
  /**
   * Хэрэглэгчийг бүртгэх.
   * @param {string} username
   * @param {string} password
   * @param {string} email
   */
  static async registerUser(username, password, email) {
    if (!username || !password || !email) {
      throw new ValidationError("Бүх талбарыг бөглөнө үү.");
    }

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      throw new ValidationError("Энэ имэйл хаяг бүртгэлтэй байна.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Шинэ хэрэглэгч үүсгэх
    const newUser = {
      id: nextId++,
      username,
      email,
      password: hashedPassword, // Hash-лэгдсэн нууц үг хадгалах
    };

    users.push(newUser);

    // Хариуг зөвхөн хэрэгцээтэй мэдээллээр буцаах (нууц үгийг оруулахгүй)
    const { password: _, ...userData } = newUser;
    return userData;
  }

  // Test-д зориулсан функц: DB-г цэвэрлэх
  static clearUsers() {
    users.length = 0;
    nextId = 1;
  }
}

module.exports = UserService;

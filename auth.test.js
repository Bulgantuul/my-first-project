// auth.test.js
const { hashPassword, comparePassword } = require("./auth");

// Тестийн жишиг нууц үг
const TEST_PASSWORD = "verysecurepassword";

describe("User Authentication Logic (US-01)", () => {
  let hashedPassword;

  // 1. Нууц үг хаш-лах (Hashing) тест
  test("Нууц үгийг hash-лахад өөр өөр утга үүсгэх ёстой", async () => {
    // 1.1 Улаан (Red): Эхлээд hashPassword функц байхгүйгээс алдаа заана.
    hashedPassword = await hashPassword(TEST_PASSWORD);

    // 1.2 Ногоон (Green): Функцыг бичсэний дараа тест хийх

    // Hash-ын урт нь null эсвэл undefined биш байх ёстой
    expect(hashedPassword).toBeDefined();

    // Hash нь анхны нууц үгтэйгээ таарахгүй байх ёстой (Аюулгүй байдал)
    expect(hashedPassword).not.toBe(TEST_PASSWORD);
  });

  // 2. Нууц үг тулгах (Comparing) тест
  test("Өгөгдсөн нууц үг hash-тайгаа зөв таарах ёстой", async () => {
    // 2.1 Улаан (Red): Эхлээд comparePassword функц байхгүйгээс алдаа заана.

    // 2.2 Ногоон (Green): Функцыг бичсэний дараа тест хийх

    // Зөв нууц үгээр шалгах
    const isMatch = await comparePassword(TEST_PASSWORD, hashedPassword);
    expect(isMatch).toBe(true);

    // Буруу нууц үгээр шалгах
    const isMismatch = await comparePassword("wrongpassword", hashedPassword);
    expect(isMismatch).toBe(false);
  });
});

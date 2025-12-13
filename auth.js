// auth.js
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10; // Нууц үг хаш-лах давталтын тоо (Аюулгүй байдлын түвшин)

/**
 * Хэрэглэгчийн нууц үгийг хаш-лаж хадгалах.
 * Энэ нь бүртгүүлэх үед ашиглагдана (US-01).
 * @param {string} password - Хэрэглэгчийн нууц үг.
 * @returns {Promise<string>} - Хаш-лагдсан нууц үг.
 */
async function hashPassword(password) {
  // Ногоон (Green): bcrypt ашиглан нууц үгийг хаш-лах
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Хэрэглэгчийн нэвтрэх үед нууц үгийг хаш-тай тулгах.
 * Энэ нь нэвтрэх үед ашиглагдана (US-01).
 * @param {string} plainPassword - Хэрэглэгчийн оруулсан нууц үг.
 * @param {string} hashedPassword - Датабаазад хадгалагдсан хаш.
 * @returns {Promise<boolean>} - Нууц үг таарч байгаа эсэх.
 */
async function comparePassword(plainPassword, hashedPassword) {
  // Ногоон (Green): bcrypt ашиглан нууц үгийг хаш-тай тулгах
  return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};

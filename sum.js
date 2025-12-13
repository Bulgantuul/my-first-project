/**
 * Өгөгдсөн хоёр тооны нийлбэрийг олох функц.
 * Тоон бус өгөгдөл орж ирвэл алдаа заана.
 * * @param {number} a - Эхний тоо
 * @param {number} b - Хоёр дахь тоо
 * @returns {number} Хоёр тооны нийлбэр
 * @throws {Error} Хэрэв a эсвэл b нь тоо биш бол.
 */
function sum(a, b) {
  // Шаардлага #2: Тоон бус өгөгдөл шалгах
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Зөвхөн тоон утга шаардлагатай");
  }

  // Шаардлага #1: Зөв нийлбэрийг олох
  return a + b;
}

module.exports = sum;

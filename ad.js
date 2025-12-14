// ad.js (Шинэчлэгдсэн)
// Exceptions-уудыг оруулж ирэх
const { ValidationError } = require("./exceptions/AppError");

/**
 * Автомашины зарын үндсэн мэдээллийн Model.
 */
class CarAd {
  constructor(model, price, year) {
    // Validation 1: Үнэ заавал байх ёстой
    if (price === null || price === undefined) {
      throw new ValidationError("Үнэ заавал шаардлагатай.");
    }

    // Validation 2: Он тоо байх ёстой
    if (typeof year !== "number" || isNaN(year)) {
      throw new ValidationError("Үйлдвэрлэсэн он тоо байх ёстой.");
    }

    // Validation 3: Үнэ 0-ээс их байх ёстой
    if (price <= 0) {
      throw new ValidationError("Үнэ 0-ээс бага байж болохгүй.");
    }

    // Обьектын утгуудыг оноох
    this.model = model;
    this.price = price;
    this.year = year;
  }
}

module.exports = CarAd;

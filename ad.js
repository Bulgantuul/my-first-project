const { ValidationError } = require("./exceptions/AppError");
class CarAd {
  constructor(model, price, year) {
    if (price === null || price === undefined) {
      throw new ValidationError("Үнэ заавал шаардлагатай.");
    }

    if (typeof year !== "number" || isNaN(year)) {
      throw new ValidationError("Үйлдвэрлэсэн он тоо байх ёстой.");
    }

    if (price <= 0) {
      throw new ValidationError("Үнэ 0-ээс бага байж болохгүй.");
    }

    this.model = model;
    this.price = price;
    this.year = year;
  }
}

module.exports = CarAd;

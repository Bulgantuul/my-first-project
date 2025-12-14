// ad.js

/**
 * Автомашины зарын үндсэн мэдээллийн Model.
 * US-02-ийн дагуу өгөгдлийг шалгах (validation) логикийг агуулна.
 */
class CarAd {
  /**
   * @param {string} model - Машины загвар (Жишээ нь: Toyota Prius)
   * @param {number} price - Үнэ (Төгрөгөөр)
   * @param {number} year - Үйлдвэрлэсэн он
   * @throws {Error} Хэрэв өгөгдөл validation шалгалтыг хангахгүй бол.
   */
  constructor(model, price, year) {
    // Validation 1: Үнэ заавал байх ёстой
    if (price === null || price === undefined) {
      throw new Error("Үнэ заавал шаардлагатай.");
    }

    // Validation 2: Он тоо байх ёстой
    if (typeof year !== "number" || isNaN(year)) {
      throw new Error("Үйлдвэрлэсэн он тоо байх ёстой.");
    }

    // Validation 3: Үнэ 0-ээс их байх ёстой
    if (price <= 0) {
      throw new Error("Үнэ 0-ээс бага байж болохгүй.");
    }

    // Обьектын утгуудыг оноох
    this.model = model;
    this.price = price;
    this.year = year;
    // ... бусад талбарууд (жишээ нь, userId, description)
  }
}

module.exports = CarAd;

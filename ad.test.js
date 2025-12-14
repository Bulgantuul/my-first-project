// ad.test.js
const CarAd = require("./ad");

describe("Car Ad Model Validation (US-02)", () => {
  // Зөв өгөгдөл бүхий жишиг обьект
  const validAdData = {
    model: "Toyota Prius",
    price: 35000000,
    year: 2018,
  };

  // 1. Үндсэн амжилттай тест
  test("Зөв өгөгдлөөр зар үүсгэхэд алдаа гарах ёсгүй", () => {
    // Улаан (Red): Эхлээд CarAd класс байхгүйгээс алдаа заана.

    // Ногоон (Green): Классыг бичсэний дараа тест хийх
    const ad = new CarAd(
      validAdData.model,
      validAdData.price,
      validAdData.year
    );
    expect(ad).toBeDefined();
    expect(ad.model).toBe("Toyota Prius");
    expect(ad.price).toBe(35000000);
  });

  // 2. Үнэ заавал байх ёстой
  test("Үнэ (price) байхгүй бол алдаа заах ёстой", () => {
    // Улаан (Red): validation байхгүйгээс алдаа гарахгүй.

    // Ногоон (Green): validation-ыг бичсэний дараа тест хийх
    expect(() => new CarAd("Toyota", null, 2018)).toThrow(
      "Үнэ заавал шаардлагатай."
    );
  });

  // 3. Үйлдвэрлэсэн он тоо байх ёстой
  test("Он (year) тоо биш бол алдаа заах ёстой", () => {
    // Улаан (Red): validation байхгүйгээс алдаа гарахгүй.

    // Ногоон (Green): validation-ыг бичсэний дараа тест хийх
    expect(() => new CarAd("Toyota", 35000000, "хорин арван найм")).toThrow(
      "Үйлдвэрлэсэн он тоо байх ёстой."
    );
  });

  // 4. Үнийн хамгийн бага утга
  test("Үнэ 0-ээс бага байвал алдаа заах ёстой", () => {
    // Улаан (Red): validation байхгүйгээс алдаа гарахгүй.

    // Ногоон (Green): validation-ыг бичсэний дараа тест хийх
    expect(() => new CarAd("Toyota", -100, 2018)).toThrow(
      "Үнэ 0-ээс бага байж болохгүй."
    );
  });
});

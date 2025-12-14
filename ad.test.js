const CarAd = require("./ad");
// Custom Error-уудыг оруулж ирэх
const { ValidationError } = require("./exceptions/AppError");

describe("Car Ad Model Validation (US-02) - Error Handling", () => {
  // ... validAdData-г үлдээх ...

  // 1. Үнэ 0-ээс бага байвал алдаа заах ёстой
  test("Үнэ 0-ээс бага байвал ValidationError заах ёстой", () => {
    // expect-ийг зөвхөн message-ээр биш, ValidationError класс-аар шалгах
    expect(() => new CarAd("Toyota", -100, 2018)).toThrow(ValidationError);
    expect(() => new CarAd("Toyota", -100, 2018)).toThrow(
      "Үнэ 0-ээс бага байж болохгүй."
    );
  });

  // 2. Үйлдвэрлэсэн он тоо биш бол ValidationError заах ёстой
  test("Он (year) тоо биш бол ValidationError заах ёстой", () => {
    expect(() => new CarAd("Toyota", 35000000, "хорин арван найм")).toThrow(
      ValidationError
    );
    expect(() => new CarAd("Toyota", 35000000, "хорин арван найм")).toThrow(
      "Үйлдвэрлэсэн он тоо байх ёстой."
    );
  });

  // 3. Үндсэн Exception класс-аар шалгах (Сонголт)
  test("Баталгаажуулалтын алдаа 400 статус кодтой байх ёстой", () => {
    try {
      new CarAd("Toyota", null, 2018);
    } catch (e) {
      expect(e).toBeInstanceOf(ValidationError);
      expect(e.statusCode).toBe(400);
    }
  });
});

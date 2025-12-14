// public/app.js

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registration-form");
  const messageArea = document.getElementById("message-area");
  const registerSection = document.getElementById("register-section");
  const loginSection = document.getElementById("login-section");
  const showRegisterBtn = document.getElementById("show-register");
  const showLoginBtn = document.getElementById("show-login");

  // Хэсгүүдийг сэлгэх
  showRegisterBtn.addEventListener("click", () => {
    registerSection.classList.remove("hidden");
    loginSection.classList.add("hidden");
  });

  showLoginBtn.addEventListener("click", () => {
    registerSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
  });

  // Мэдээллийн талбарыг үзүүлэх функц
  const displayMessage = (message, type = "success") => {
    messageArea.textContent = message;
    messageArea.className = `message ${type}`;
  };

  // Бүртгүүлэх формыг илгээх (Back-end API руу)
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    messageArea.textContent = "";
    messageArea.className = "message";

    const username = document.getElementById("reg-username").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    // Back-end Server-ийн хаяг (server.js дээр 3000 порт дээр ажиллаж байгаа)
    const API_URL = "http://localhost:3000/api/register";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Амжилттай бүртгэгдсэн (Статус 201)
        displayMessage(data.message || "Бүртгэл амжилттай.", "success");
        registerForm.reset();
      } else {
        // API-аас буцаж ирсэн алдаа (400, 500)
        const errorMessage =
          data.message || data.error || "Бүртгүүлэхэд алдаа гарлаа.";
        displayMessage(`Алдаа: ${errorMessage}`, "error");
      }
    } catch (error) {
      // Сүлжээний холболтын алдаа
      displayMessage(
        "Сүлжээний холболтын алдаа. Сервер ажиллаж байгаа эсэхийг шалгана уу.",
        "error"
      );
    }
  });
});

// register.js
const BASE_URL = 'https://notes-be006-371739253078.us-central1.run.app/notes';
// const BASE_URL = 'https://fe-006-dot-g-11-450801.uc.r.appspot.com/api';


document.addEventListener("DOMContentLoaded", () => {
  const registerBtn = document.getElementById("register-btn");
  const authMessage = document.getElementById("auth-message");

  registerBtn.addEventListener("click", async () => {
    authMessage.textContent = "";

    const username = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value.trim();
    const name = document.getElementById("register-name").value.trim();

    if (!username || !password) {
      authMessage.textContent = "Please enter username and password";
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        authMessage.textContent = data.message || "Registration failed";
        return;
      }

      authMessage.style.color = "green";
      authMessage.textContent = "Registration successful, please login";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    } catch (error) {
      authMessage.textContent = "Registration error: " + error.message;
    }
  });
});

// login.js
const BASE_URL = 'https://notes-be006-371739253078.us-central1.run.app/api/';

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const authMessage = document.getElementById("auth-message");

  loginBtn.addEventListener("click", async () => {
    authMessage.textContent = "";

    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!username || !password) {
      authMessage.textContent = "Please enter username and password";
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        authMessage.textContent = data.message || "Login failed";
        return;
      }

      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } catch (error) {
      authMessage.textContent = "Login error: " + error.message;
    }
  });
});

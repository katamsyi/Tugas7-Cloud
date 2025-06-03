const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", async () => {
  const usernameOrEmail = document.getElementById("login-user").value.trim();
  const password = document.getElementById("login-pass").value.trim();

  if (!usernameOrEmail || !password) {
    alert("Semua field harus diisi");
    return;
  }

  try {
    const res = await fetch("https://notes-be006-371739253078.us-central1.run.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernameOrEmail, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("accessToken", data.accessToken);
      alert("Login berhasil!");
      window.location.href = "index.html";
    } else {
      alert(data.message || "Login gagal.");
    }
  } catch (err) {
    alert("Terjadi kesalahan saat login.");
  }
});

const registerBtn = document.getElementById("register-btn");

registerBtn.addEventListener("click", async () => {
  const username = document.getElementById("register-username").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();

  if (!username || !email || !password) {
    alert("Semua field harus diisi");
    return;
  }

  try {
    const res = await fetch("https://notes-be006-371739253078.us-central1.run.app/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Registrasi berhasil. Silakan login.");
      window.location.href = "login.html";
    } else {
      alert(data.message || "Registrasi gagal.");
    }
  } catch (err) {
    alert("Terjadi kesalahan saat register.");
  }
});

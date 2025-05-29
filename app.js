const token = localStorage.getItem("accessToken");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

const judulInput = document.getElementById("judul");
const deskripsiInput = document.getElementById("deskripsi");
const tambahBtn = document.getElementById("tambah-btn");
const noteList = document.getElementById("note-list");
const logoutBtn = document.getElementById("logout-btn");

if (!token) {
  alert("Silakan login terlebih dahulu");
  window.location.href = "login.html";
}

const loadNotes = async () => {
  try {
    const res = await fetch(`${BASE_URL}/notes`, { headers });
    const data = await res.json();

    noteList.innerHTML = "";
    data.forEach((note) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${note.judul_Catatan}</strong><br>
        <small>${note.deskripsi_Catatan}</small><br>
        <button onclick="hapusNote(${note.id})">Hapus</button>
        <button onclick="editNote(${note.id}, '${note.judul_Catatan}', '${note.deskripsi_Catatan}')">Edit</button>
        <hr>
      `;
      noteList.appendChild(li);
    });
  } catch (err) {
    alert("Gagal memuat catatan");
  }
};

tambahBtn.addEventListener("click", async () => {
  const judul = judulInput.value.trim();
  const deskripsi = deskripsiInput.value.trim();
  if (!judul || !deskripsi) {
    alert("Judul dan deskripsi harus diisi");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers,
      body: JSON.stringify({ judul_Catatan: judul, deskripsi_Catatan: deskripsi }),
    });

    if (res.ok) {
      judulInput.value = "";
      deskripsiInput.value = "";
      loadNotes();
    } else {
      alert("Gagal menambah catatan");
    }
  } catch (err) {
    alert("Terjadi kesalahan saat menambah catatan");
  }
});

const hapusNote = async (id) => {
  if (!confirm("Yakin ingin menghapus catatan ini?")) return;
  try {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
      headers,
    });

    if (res.ok) {
      loadNotes();
    } else {
      alert("Gagal menghapus catatan");
    }
  } catch (err) {
    alert("Terjadi kesalahan saat menghapus catatan");
  }
};

const editNote = async (id, oldTitle, oldDesc) => {
  const newTitle = prompt("Judul baru:", oldTitle);
  const newDesc = prompt("Deskripsi baru:", oldDesc);

  if (!newTitle || !newDesc) return;

  try {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ judul_Catatan: newTitle, deskripsi_Catatan: newDesc }),
    });

    if (res.ok) {
      loadNotes();
    } else {
      alert("Gagal mengedit catatan");
    }
  } catch (err) {
    alert("Terjadi kesalahan saat mengedit catatan");
  }
};

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("accessToken");
  window.location.href = "login.html";
});

window.onload = loadNotes;

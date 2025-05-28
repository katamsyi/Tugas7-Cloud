

// app.js
const BASE_URL = 'https://notes-be006-371739253078.us-central1.run.app/notes'; 
//"http://localhost:5000";

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  const addNoteBtn = document.getElementById("add-note");
  const saveNoteBtn = document.getElementById("save-note");
  const updateNoteBtn = document.getElementById("update-note");
  const deleteNoteBtn = document.getElementById("delete-note");

  logoutBtn.addEventListener("click", logoutUser);
  addNoteBtn.addEventListener("click", prepareNewNote);
  saveNoteBtn.addEventListener("click", saveNewNote);
  updateNoteBtn.addEventListener("click", updateNote);
  deleteNoteBtn.addEventListener("click", deleteNote);

  // On load
  if (!localStorage.getItem("token")) {
    alert("You must login first!");
    window.location.href = "login.html";
  } else {
    loadNotes();
    resetNoteDetails();
  }
});

let selectedNoteId = null;

async function loadNotes() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to load notes");
    const notes = await response.json();
    displayNoteTitles(notes);
  } catch (error) {
    alert("Error loading notes: " + error.message);
    if (error.message.includes("401") || error.message.includes("403")) {
      logoutUser();
    }
  }
}

function displayNoteTitles(notes) {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";
  notes.forEach((note) => {
    const li = document.createElement("li");
    li.textContent = note.judul_Catatan;
    li.onclick = () => loadNoteDetails(note.id_Catatan);
    notesList.appendChild(li);
  });
}

async function loadNoteDetails(id) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to load note details");
    const note = await response.json();

    document.getElementById("note-title").value = note.judul_Catatan;
    document.getElementById("note-content").value = note.deskripsi_Catatan;

    selectedNoteId = note.id_Catatan;
    toggleButtonsForSelectedNote();
  } catch (error) {
    alert("Error loading note: " + error.message);
  }
}

function prepareNewNote() {
  selectedNoteId = null;
  resetNoteDetails();
  toggleButtonsForNewNote();
}

async function saveNewNote() {
  const token = localStorage.getItem("token");
  const title = document.getElementById("note-title").value.trim();
  const content = document.getElementById("note-content").value.trim();

  if (!title || !content) {
    alert("Title and content cannot be empty");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        judul_Catatan: title,
        deskripsi_Catatan: content,
      }),
    });
    if (!response.ok) throw new Error("Failed to save note");
    alert("Note saved");
    loadNotes();
    resetNoteDetails();
  } catch (error) {
    alert("Error saving note: " + error.message);
  }
}

async function updateNote() {
  if (!selectedNoteId) {
    alert("Select a note to update");
    return;
  }
  const token = localStorage.getItem("token");
  const title = document.getElementById("note-title").value.trim();
  const content = document.getElementById("note-content").value.trim();

  if (!title || !content) {
    alert("Title and content cannot be empty");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/notes/${selectedNoteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        judul_Catatan: title,
        deskripsi_Catatan: content,
      }),
    });
    if (!response.ok) throw new Error("Failed to update note");
    alert("Note updated");
    loadNotes();
  } catch (error) {
    alert("Error updating note: " + error.message);
  }
}

async function deleteNote() {
  if (!selectedNoteId) {
    alert("Select a note to delete");
    return;
  }
  if (!confirm("Are you sure you want to delete this note?")) return;

  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}/notes/${selectedNoteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to delete note");
    alert("Note deleted");
    loadNotes();
    resetNoteDetails();
  } catch (error) {
    alert("Error deleting note: " + error.message);
  }
}

function logoutUser() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

function resetNoteDetails() {
  document.getElementById("note-title").value = "";
  document.getElementById("note-content").value = "";
  toggleButtonsForNewNote();
}

function toggleButtonsForSelectedNote() {
  document.getElementById("save-note").style.display = "none";
  document.getElementById("update-note").style.display = "inline-block";
  document.getElementById("delete-note").style.display = "inline-block";
}

function toggleButtonsForNewNote() {
  document.getElementById("save-note").style.display = "inline-block";
  document.getElementById("update-note").style.display = "none";
  document.getElementById("delete-note").style.display = "none";
}

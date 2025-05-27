const { Note } = require("../models");

// Get semua catatan
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Get catatan berdasarkan ID
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note)
      return res.status(404).json({ message: "Note could not be found" });
    res.json(note);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Tambah catatan baru
exports.createNote = async (req, res) => {
  try {
    const { judul_Catatan, deskripsi_Catatan } = req.body;
    if (!judul_Catatan || !deskripsi_Catatan) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const newNote = await Note.create({ judul_Catatan, deskripsi_Catatan });
    res.status(201).json(newNote);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Update catatan berdasarkan ID
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note)
      return res.status(404).json({ message: "Note could not be found" });

    await note.update({
      judul_Catatan: req.body.judul_Catatan,
      deskripsi_Catatan: req.body.deskripsi_Catatan,
    });

    res.json({ message: "Note has been updated", note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Hapus catatan berdasarkan ID
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note)
      return res.status(404).json({ message: "Note could not be found" });

    await note.destroy();
    res.json({ message: "Note has been deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

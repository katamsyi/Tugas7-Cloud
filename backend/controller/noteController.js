const { Note } = require("../models");

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.findAll();
    const formatted = notes.map((note) => ({
      id: note.id,
      judul_Catatan: note.judul_Catatan,
      deskripsi_Catatan: note.deskripsi_Catatan,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    }));
    res.json(formatted);
  } catch (error) {
    console.error("Error di getAllNotes:", error);
    res
      .status(500)
      .json({ message: "Gagal mengambil catatan", error: error.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note)
      return res.status(404).json({ message: "Catatan tidak ditemukan" });

    res.json({
      id: note.id,
      judul_Catatan: note.judul_Catatan,
      deskripsi_Catatan: note.deskripsi_Catatan,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil catatan", error: error.message });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { judul_Catatan, deskripsi_Catatan } = req.body;
    if (!judul_Catatan || !deskripsi_Catatan) {
      return res
        .status(400)
        .json({ message: "Judul dan deskripsi wajib diisi" });
    }

    const newNote = await Note.create({ judul_Catatan, deskripsi_Catatan });
    res.status(201).json(newNote);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menambahkan catatan", error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note)
      return res.status(404).json({ message: "Catatan tidak ditemukan" });

    await note.update({
      judul_Catatan: req.body.judul_Catatan,
      deskripsi_Catatan: req.body.deskripsi_Catatan,
    });

    res.json({ message: "Catatan berhasil diperbarui", note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal memperbarui catatan", error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note)
      return res.status(404).json({ message: "Catatan tidak ditemukan" });

    await note.destroy();
    res.json({ message: "Catatan berhasil dihapus" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menghapus catatan", error: error.message });
  }
};

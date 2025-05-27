const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  try {
    const { username, password, name } = req.body;

    // Validasi input dasar
    if (!username || !password) {
      return res.status(400).json({ message: "Username dan password diperlukan" });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword, name });

    res.status(201).json({ message: "User berhasil didaftarkan" });
  } catch (err) {
    console.error("Error saat register:", err);
    res.status(500).json({ message: "Terjadi kesalahan server", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi input dasar
    if (!username || !password) {
      return res.status(400).json({ message: "Username dan password diperlukan" });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Error saat login:", err);
    res.status(500).json({ message: "Terjadi kesalahan server", error: err.message });
  }
};

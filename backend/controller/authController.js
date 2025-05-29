const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { Op } = require("sequelize");

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = (user) =>
  jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "15m",
  });

const generateRefreshToken = (user) =>
  jwt.sign({ id: user.id, username: user.username }, REFRESH_SECRET, {
    expiresIn: "7d",
  });

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser)
      return res.status(409).json({ message: "Username sudah digunakan" });

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail)
      return res.status(409).json({ message: "Email sudah digunakan" });

    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password_hash });

    res
      .status(201)
      .json({ message: "User berhasil didaftarkan", userId: user.id });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });

    if (!user)
      return res
        .status(401)
        .json({ message: "Username/email atau password salah" });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid)
      return res
        .status(401)
        .json({ message: "Username/email atau password salah" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({
      accessToken,
      refreshToken,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: err.message });
  }
};

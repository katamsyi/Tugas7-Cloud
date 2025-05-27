require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database.js");
const noteRoutes = require("./routes/noteRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const authenticateToken = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

// Proteksi semua route notes
app.use("/notes", authenticateToken, noteRoutes);

sequelize
  .sync()
  .then(() => console.log("Database terhubung"))
  .catch((err) => console.error("Gagal koneksi ke database", err));

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .json({ message: "Terjadi kesalahan server", error: err.message });
});

app.listen(PORT, () =>
  console.log(`Server berjalan di http://localhost:${PORT}`)
);

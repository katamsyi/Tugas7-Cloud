require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const authenticateToken = require("./middleware/authMiddleware");

const db = require("./models").sequelize;

// Middleware global
app.use(cors());
app.use(express.json());

// Route publik
app.use("/api/auth", authRoutes);

// Route catatan (butuh token)
app.use("/api/notes", authenticateToken, noteRoutes);

// Root
app.get("/", (req, res) => {
  res.send("Notes App API berjalan");
});

// Jalankan server
const PORT = process.env.PORT || 5000;
db.sync() // ini akan hapus dan buat ulang tabel sesuai model
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server berjalan di port ${PORT}`);
    });
  });

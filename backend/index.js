require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const authenticateToken = require('./middleware/authMiddleware');

app.use(cors());
app.use(express.json());


// Route yang butuh token, pasang middleware JWT
app.use('/api/notes', authenticateToken, noteRoutes);

app.use("/api/auth", authRoutes);

// Proteksi semua route notes
app.use("/api/notes", authenticateToken, noteRoutes);
// Route yang butuh token, pasang middleware JWT
app.use('/api/notes', authenticateToken, noteRoutes);

// Default route (opsional)
app.get('/', (req, res) => {
  res.send('API Notes App berjalan');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

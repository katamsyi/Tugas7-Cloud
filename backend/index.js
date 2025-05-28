require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const authenticateToken = require('./middleware/authMiddleware');

// Middleware global untuk parsing JSON dan cors
app.use(cors());
app.use(express.json());

// Route untuk autentikasi tanpa middleware
app.use("/api/auth", authRoutes);

// Route notes yang butuh autentikasi token JWT
app.use('/api/notes', authenticateToken, noteRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API Notes App berjalan');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

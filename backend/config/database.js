// Jika pakai CommonJS (require/module.exports)
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+07:00',  // optional, sesuaikan zona waktu
  }
);

module.exports = sequelize;

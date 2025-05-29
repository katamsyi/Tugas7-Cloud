const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Note = sequelize.define(
  "notes",
  {
    judul_Catatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deskripsi_Catatan: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Note;

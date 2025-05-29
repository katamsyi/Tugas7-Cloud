const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "users",
  {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;

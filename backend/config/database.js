const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("notesapp", "root", "", {
  host: "34.68.255.249",
  host: "localhost",
  host: "34.68.255.249",
  //host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;

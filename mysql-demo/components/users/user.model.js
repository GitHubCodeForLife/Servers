const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/db.config");

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = User;

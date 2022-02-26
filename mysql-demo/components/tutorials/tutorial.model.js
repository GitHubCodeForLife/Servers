const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/db.config");

const Tutorial = sequelize.define(
  "Tutorial",
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Tutorial;

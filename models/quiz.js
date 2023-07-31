const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Quiz extends Model {}

Quiz.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    quiz_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 16],
      },
    },
    quiz_description: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: [4, 16],
      },
    },
    quiz_category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 16],
      },
    },
    quiz_difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "quiz",
  }
);

module.exports = Quiz;

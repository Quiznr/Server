const { Model, DataTypes } = require("sequelize");
const Quiz = require("./quiz");
const sequelize = require("../config/connection");

class Question extends Model {}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    question_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer_choices: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("answer_choices").split(",");
      },
      set(val) {
        this.setDataValue("answer_choices", val.join(","));
      },
    },
    correct_answer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: function (value) {
          const answerCount = this.answer_choices.length;
          if (value >= answerCount) {
            throw new Error("Invalid correct answer index");
          }
        },
      },
    },
    quiz_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "quiz", // This should match the table name of the Quiz model
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "question",
  }
);

// Set up the association between Quiz and Question
Quiz.hasMany(Question, {
  foreignKey: "quiz_id",
});
Question.belongsTo(Quiz, {
  foreignKey: "quiz_id",
});

module.exports = Question;

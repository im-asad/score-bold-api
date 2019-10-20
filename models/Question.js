const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Question = sequelize.define('question', {
        questionId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        question: {
            type: Sequelize.STRING,
        },
        questionType: {
            type: Sequelize.STRING,
        },
        correctAnswerReason: {
            type: Sequelize.STRING,
        }
    });

    Question.associate = (models) => {
        Question.belongsToMany(models.Chapter, {through: models.ChapterQuestion, foreignKey: "questionId"});
        Question.belongsToMany(models.Answer, {through: models.QuestionAnswer, foreignKey: "questionId"});
        Question.belongsTo(models.Answer, {foreignKey: "answerId", as: 'ActualAnswer'});
        Question.belongsToMany(models.Media, {through: models.QuestionMedia, foreignKey: "questionId"});
    };

    return Question;
};
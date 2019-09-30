const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Answer = sequelize.define('answer', {
        answerId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        answer: {
            type: Sequelize.STRING,
        },
    });

    Answer.associate = (models) => {
        Answer.belongsToMany(models.Question, {through: models.QuestionAnswer, foreignKey: "answerId"});
    };

    return Answer;
};
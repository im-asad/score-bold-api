const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('chapter_question', {
        chapterQuestionId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    });
};
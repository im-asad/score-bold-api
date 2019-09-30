const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('question_answer', {
        questionAnswerId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    });
};
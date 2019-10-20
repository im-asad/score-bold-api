const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('answer_media', {
        answerMediaId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    });
};
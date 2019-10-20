const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('question_media', {
        questionMediaId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    });
};
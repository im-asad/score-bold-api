const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('course_chapter', {
        courseChapterId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    });
};
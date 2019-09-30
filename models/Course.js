const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Course = sequelize.define('course', {
        courseId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        courseName: {
            type: Sequelize.STRING,
        },
    });

    Course.associate = (models) => {
        Course.belongsToMany(models.Chapter, {through: models.CourseChapter, foreignKey: "courseId"});
    };

    return Course;
};
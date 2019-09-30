const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Chapter = sequelize.define('chapter', {
        chapterId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        chapterName: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
    });

    Chapter.associate = (models) => {
        Chapter.belongsToMany(models.Course, {through: models.CourseChapter, foreignKey: "chapterId"});
        Chapter.belongsToMany(models.Question, {through: models.ChapterQuestion, foreignKey: "chapterId"});
    };

    return Chapter;
};
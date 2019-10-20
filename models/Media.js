const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Media = sequelize.define('Media', {
        mediaId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: Sequelize.STRING,
        },
        mediaType: {
            type: Sequelize.STRING,
        }
    });

    Media.associate = (models) => {
        Media.belongsToMany(models.Question, {through: models.QuestionMedia, foreignKey: "mediaId"});
        Media.belongsToMany(models.Answer, {through: models.AnswerMedia, foreignKey: "mediaId"});
    };

    return Media;
};
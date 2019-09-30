const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fullName: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        }
    });

    User.associate = (models) => {

    };

    return User;
};
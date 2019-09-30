const bcrypt = require('bcryptjs');

module.exports = {
    checkPassword: (inputPassword, hashedPassword) => {
        return bcrypt.compareSync(inputPassword, hashedPassword)
    },
    hashPassword: plainTextPassword => {
        const salt = bcrypt.genSaltSync(12);
        return bcrypt.hashSync(plainTextPassword, salt)
    }
};
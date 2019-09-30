const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(12);
const hash = bcrypt.hashSync("123456", salt);

module.exports = async (models) => {
    const {
        User
    } = models;
    await User.bulkCreate([
        {userId: 2, fullName: "Saud Awan", email: "awansaud@gmail.com", password: hash},
        {userId: 1, fullName: "Asad Awan", email: "asad.awan.se@gmail.com", password: hash},
    ]);
};
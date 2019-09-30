const LocalStrategy = require("passport-local").Strategy;
const crypt = require("../crypt/bcrypt");

module.exports = (db) => {
    const {User} = db;
    console.log("============= LOCAL STRATEGY ==================");
    return new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        const user = await User.findOne({where: {email}});
        if (!user) {
            return done(null, false, {message: 'User not found.'})
        }
        if (!crypt.checkPassword(password, user.password)) {
            return done(null, false, {message: 'Invalid credentials.'})
        }
        return done(null, user)
    });
};
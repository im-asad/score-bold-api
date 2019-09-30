const passport = require('passport');

module.exports = (db) => {
    const {User} = db;
    const LocalStrategy = require('./localStrategy')(db);
    console.log("============= HERE IN INDEX.JS ==================");
    // called on login, saves the id to session req.session.passport.user = {id:'..'}
    passport.serializeUser((user, done) => {
        console.log("============= SERIALIZING ==================");
        console.log(user);
        done(null, { _id: user.userId, fullName: user.fullName, email: user.email });
    });

    // user object attaches to the request as req.user
    passport.deserializeUser(async (passportSession, done) => {
        console.log("============= DESERIALIZING ==================");
        console.log("THIS IS THE ID: ", passportSession);
        const user = await User.findOne({where: { userId: passportSession._id, email: passportSession.email }});
        done(null, user)
    });

    //  Use Strategies
    passport.use("local", LocalStrategy);
    return passport
};
const router = require("express").Router();
const crypt = require("../services/crypt/bcrypt");

const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = (db) => {
    const passport = require('../services/passport')(db);
    const {User} = db;
    // Sign up
    router.post("/api/register", async (req, res) => {
        const {fullName, email, password} = req.body;
        const hashedPassword = crypt.hashPassword(password);
        const user = await User.create({fullName, email, password: hashedPassword});
        res.json({status: 200, user, message: "User has been created."});
    });

    router.post('/api/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) { return next(err); }
            if (!user) { return res.json({status: 404, message: info.message}); }
            const {fullName, email, userId, password, createdAt, updatedAt} = user;

            // Set req.user to current user
            // req.session._id = userId;
            req.logIn({fullName, email, userId, password, createdAt, updatedAt}, (err) => {});
            console.log("THIS IS THE SESSION: ", req.session);
            return next();
        })(req, res, next);
    }, (req, res) => {
        res.json({status: 200, message: "User logged in.", user: req.user, isAuthenticated: true});
    });

    router.post("/api/authenticate", async (req, res) => {
        console.log("============================ AUTHENTICATION ATTEMPT ==================================");
        console.log("REQUEST SESSION: ", req.session);
        if (req.user) {
            const user = await User.findOne({where: {userId: req.user.userId}});
            if (user) {
                res.json({status: 200, message: "Logged in.", user: req.user, isAuthenticated: true});
            } else {
                res.json({status: 403, message: "User doesn't exist.", user: null, isAuthenticated: false});
            }
        } else {
            res.json({status: 403, message: "Not logged in.", user: null, isAuthenticated: false});
        }
    });

    router.get('/api/logout', function(req, res){
        req.logout();
        res.json({status: 200, message: "User has been logged out. Session destroyed.", user: null, isAuthenticated: false});
    });

    return router;
};
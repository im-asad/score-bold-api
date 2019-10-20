const express = require("express");
const Sequelize = require("sequelize");

const app = express();
const session = require('express-session');

const path = require('path');
const seedDB = require("./seed");
/* Connect to MySQL Database */

let sequelize;
if (process.env.NODE_ENV === "production") {
    sequelize = new Sequelize("heroku_059807d4aa36b23", "b1640e1e0985d8", "ebff5ee5", {
        host: "us-cdbr-iron-east-02.cleardb.net",
        dialect: 'mysql',
    });
} else {
    sequelize = new Sequelize("scorebold_production", "root", "1234", {
        host: "localhost",
        dialect: 'mysql',
    });
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Profit-Pro-APP/build')));
// app.use(cors());

// Importing Database Models
const db = {
    User: sequelize.import("./models/User"),
    Course: sequelize.import("./models/Course"),
    Chapter: sequelize.import("./models/Chapter"),
    CourseChapter: sequelize.import("./models/CourseChapter"),
    Question: sequelize.import("./models/Question"),
    ChapterQuestion: sequelize.import("./models/ChapterQuestion"),
    Answer: sequelize.import("./models/Answer"),
    QuestionAnswer: sequelize.import("./models/QuestionAnswer"),
    Media: sequelize.import("./models/Media"),
    QuestionMedia: sequelize.import("./models/QuestionMedia"),
    AnswerMedia: sequelize.import("./models/AnswerMedia")
};

Object.keys(db).forEach((model) => {
    if ('associate' in db[model]) {
        db[model].associate(db)
    }
});

// sequelize.sync({force: true})
sequelize.sync()
    .then(async () => {
        const passport = require('./services/passport')(db);
        // await seedDB(db);
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
            next();
        });

        app.use(
            session({
                secret: 'Profit-Pro Auth Secret',
                saveUninitialized: false,
                resave: false,
                cookie : {
                    secure : false,
                    httpOnly: false,
                },
            })
        );

        app.use(passport.initialize());
        app.use(passport.session());

        const authRoutes = require("./routes/auth")(db);
        const generalRoutes = require("./routes/general")(db);
        const courseRoutes = require("./routes/Course")(db);
        const chapterRoutes = require("./routes/Chapter")(db);
        const questionRoutes = require("./routes/Question")(db);
        const answerRoutes = require("./routes/Answer")(db);
        app.use(authRoutes);
        app.use(generalRoutes);
        app.use(courseRoutes);
        app.use(chapterRoutes);
        app.use(questionRoutes);
        app.use(answerRoutes);

        app.get("/api/test", (req, res) => {
            console.log("THIS IS THE TEST REQUEST: ", req.user);
            res.json({message: "API RUNNING"});
        });

        app.get('/', function(req, res) {
            res.sendFile(path.join(__dirname, '../Profit-Pro-APP/build', 'index.html'))
        });

        // Listening on port 9090
        app.listen(process.env.PORT || 7000, () => {
            console.log('API Server Running.')
        });
    })
    .catch(e => {
        console.log(e);
        console.log("=====================");
        console.log('Database Sync Error!');
        console.log("=====================");
    });
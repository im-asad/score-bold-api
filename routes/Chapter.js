const router = require("express").Router();

const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = (db) => {
    const {Chapter, CourseChapter, Question, Answer} = db;

    router.get("/api/chapter", async (req, res) => {
        const options = {include: [{all: true}]};
        const chapters = await Chapter.findAll(options);
        res.status(200).json({message: "Chapters have been retrieved.", chapters});
    });

    router.get("/api/chapter/:chapterId", async (req, res) => {
        const {chapterId} = req.params;
        const options = {where: {chapterId}, include: [{all: true}, { model: Question, include: [{all: true}]}]};
        const chapter = await Chapter.findOne(options);
        res.status(200).json({message: "Chapter have been retrieved.", chapter});
    });

    router.post("/api/chapter/:courseId", async (req, res) => {
        const {courseId} = req.params;
        const {chapterName, description} = req.body;
        const created = await Chapter.create({chapterName, description});
        await CourseChapter.create({chapterId: created.chapterId, courseId});
        res.status(200).json({message: "Chapter has been created.", chapter: created});
    });

    return router;
};
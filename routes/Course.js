const router = require("express").Router();

const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = (db) => {
    const {Course} = db;

    router.get("/api/course", async (req, res) => {
        const options = {include: [{all: true}]};
        const courses = await Course.findAll(options);
        res.status(200).json({message: "Courses have been retrieved.", courses});
    });

    router.get("/api/course/:courseId", async (req, res) => {
        const {courseId} = req.params;
        const options = {where: {courseId}, include: [{all: true}]};
        const course = await Course.findOne(options);
        res.status(200).json({message: "Course has been retrieved.", course});
    });

    router.post("/api/course", async (req, res) => {
        const course = req.body;
        const created = await Course.create(course);
        res.status(200).json({message: "Course has been created.", course: created});
    });

    return router;
};
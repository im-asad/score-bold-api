const router = require("express").Router();

const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = (db) => {
    const {Answer, QuestionAnswer} = db;

    router.get("/api/answer", async (req, res) => {
        const options = {include: [{all: true}]};
        const courses = await Answer.findAll(options);
        res.status(200).json({message: "Answers have been retrieved.", courses});
    });

    router.get("/api/answer/:answerId", async (req, res) => {
        const {answerId} = req.params;
        const options = {where: {answerId}, include: [{all: true}]};
        const answer = await Answer.findOne(options);
        res.status(200).json({message: "Answer has been retrieved.", answer});
    });

    router.post("/api/answer", async (req, res) => {
        const {answer, reason, questionId} = req.body;
        const created = await Answer.create({answer, reason, questionId});
        await QuestionAnswer.create({questionId, answerId: created.answerId});
        res.status(200).json({message: "Answer has been created.", answer: created});
    });

    return router;
};
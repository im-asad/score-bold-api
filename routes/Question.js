const router = require("express").Router();

const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = (db) => {
    const {Question, Answer, QuestionAnswer, ChapterQuestion} = db;

    router.get("/api/question", async (req, res) => {
        const options = {include: [{all: true}]};
        const questions = await Question.findAll(options);
        res.status(200).json({message: "Questions have been retrieved.", questions});
    });

    router.get("/api/question/:questionId", async (req, res) => {
        const {questionId} = req.params;
        const options = {where: {questionId}, include: [{all: true}]};
        const question = await Question.findOne(options);
        res.status(200).json({message: "Question has been retrieved.", question});
    });

    router.post("/api/question/:chapterId", async (req, res) => {
        const {chapterId} = req.params;
        const {question, correctAnswerIndex, reason, formOptions} = req.body;
        let questionAnswers = [], correctAnswerId = null;
        const createdQuestion = await Question.create({question});
        await ChapterQuestion.create({questionId: createdQuestion.questionId, chapterId});

        for (let i = 0; i < formOptions.length; i++) {
            const answer = await Answer.create({answer: formOptions[i]});
            if (correctAnswerIndex === i) {
                correctAnswerId = answer.answerId;
            }
            questionAnswers.push({answerId: answer.answerId, questionId: createdQuestion.questionId});
        }

        await QuestionAnswer.bulkCreate(questionAnswers);

        await createdQuestion.update({answerId: correctAnswerId, correctAnswerReason :reason}, {where: {questionId: createdQuestion.questionId}});

        const options = {where: {questionId: createdQuestion.questionId}, include: [{all: true}]};
        const newQuestion = await Question.findOne(options);

        res.status(200).json({message: "Question has been created.", question: newQuestion});
    });

    return router;
};
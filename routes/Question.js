const router = require("express").Router();

const multer = require('multer');
const upload = multer();

const uploadService = require("../services/file-upload/upload");

module.exports = (db) => {
    const {Question, Answer, QuestionAnswer, ChapterQuestion, Media, QuestionMedia, AnswerMedia} = db;

    router.post("/api/question/upload", upload.any(), async (req, res) => {
        console.log("THIS IS THE REQUEST: ", req.files[0]);

        res.json({status: 200, message: "Uploaded successfully."})
    });

    router.get("/api/question", async (req, res) => {
        const options = {include: [{all: true}]};
        const questions = await Question.findAll(options);
        res.status(200).json({message: "Questions have been retrieved.", questions});
    });

    router.get("/api/question/:questionId", async (req, res) => {
        const {questionId} = req.params;
        const options = {where: {questionId}, include: [{all: true}, { model: Question, include: [{all: true}, { model: Answer, include: [{all: true}]}]}]};
        const question = await Question.findOne(options);
        res.status(200).json({message: "Question has been retrieved.", question});
    });

    router.post("/api/question/:courseId/:chapterId", upload.any(), async (req, res) => {
        const {chapterId} = req.params;
        let {question, correctAnswerIndex, reason, formOptions, files} = req.body;
        let questionAnswers = [], correctAnswerId = null;
        const createdQuestion = await Question.create({question});
        await ChapterQuestion.create({questionId: createdQuestion.questionId, chapterId});

        if (files["question"] && files["question"].length > 0) {
            for (let j = 0; j < files["question"].length; j++) {
                const createdMedia = await Media.create({url: files["question"][j]});
                await QuestionMedia.create({mediaId: createdMedia.mediaId, questionId: createdQuestion.questionId});
            }
        }

        if (formOptions) {
            for (let i = 0; i < formOptions.length; i++) {
                const option = formOptions[i];

                const answer = await Answer.create({answer: option.value});
                if (correctAnswerIndex === i) {
                    correctAnswerId = answer.answerId;
                }

                questionAnswers.push({answerId: answer.answerId, questionId: createdQuestion.questionId});

                if (files[option.name] && files[option.name].length > 0) {
                    for (let j = 0; j < files[option.name].length; j++) {
                        const createdMedia = await Media.create({url: files[option.name][j]});
                        await AnswerMedia.create({mediaId: createdMedia.mediaId, answerId: answer.answerId});
                    }
                }
            }
        }

        await QuestionAnswer.bulkCreate(questionAnswers);

        await createdQuestion.update({answerId: correctAnswerId, correctAnswerReason :reason}, {where: {questionId: createdQuestion.questionId}});

        const options = {where: {questionId: createdQuestion.questionId}, include: [{all: true}]};
        const newQuestion = await Question.findOne(options);

        res.status(200).json({message: "Question has been created.", question: newQuestion});
    });

    return router;
};
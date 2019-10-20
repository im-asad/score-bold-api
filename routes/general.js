const router = require("express").Router();
const crypt = require("../services/crypt/bcrypt");

const sequelize = require('sequelize');
const Op = sequelize.Op;

const multer = require('multer');
const upload = multer();

const uploadService = require("../services/file-upload/upload");

module.exports = (db) => {
    // upload file
    router.post("/api/upload", upload.any(), async (req, res) => {
        const {fileFor} = req.body;
        if (req.files && req.files.length > 0) {
            // Upload images associated with the question
            await uploadService.uploadQuestionFiles(req.files, res, fileFor);
        }
    });

    return router;
};
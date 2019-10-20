const s3 = require("./aws");

const baseUrl = "https://scorebold-storage.sgp1.cdn.digitaloceanspaces.com/";

const upload = async (file, res, fileFor) => {
    console.log("THIS IS THE FILE: ", file);
    let params = {
        Bucket: 'scorebold-storage',
        ACL: 'public-read',
        Key: file.originalname,
        Body: file.buffer,
    };
    try {
        s3.upload(params, (err, data) => {
            if (err) {
                console.log("THIS IS THE ERR: ", err);
                res.json({status: 500, message: "An error occurred while uploading the file."});
            } else {
                res.json({status: 200, message: "Uploaded successfully.", data, fileFor});
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({status: 500, message: "An error occurred while uploading the file."});
    }
};

const uploadQuestionFiles = async (files, res, fileFor) => {
    for (let i = 0; i < files.length; i++) {
        await upload(files[i], res, fileFor);
    }
};

module.exports = {
    uploadQuestionFiles
};
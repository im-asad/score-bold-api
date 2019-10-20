const aws = require('aws-sdk');
const endpoint = new aws.Endpoint("sgp1.digitaloceanspaces.com");
const s3 = new aws.S3({
    endpoint,
    accessKeyId: "NB2QI5TYZQQH7FDR7VP6",
    secretAccessKey: "bcnmAhyUUaeUDKz9qdKUKSrWC2ESRfzDdP4xyjNw2/8",
});

module.exports = s3;
const multer = require("multer");
const aws = require("aws-sdk");
const multers3 = require("multer-s3");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

module.exports = upload = multer({
  storage: multers3({
    s3,
    bucket: "afl-bucket",
    metadata: function (req, file, cb) {
      cb(null, Object.assign({}, req.body));
    },
    key: function (req, file, cb) {
      console.log(req.params.id);
      cb(null, "uploads/" +req.params.id + ".jpg");
    }
  }),
});

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const News = require("../models/news");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, `${file.originalname}`);
      },
    }),
  });

exports.postNewsController = (req, res) => {
  const uploadSingle = upload("afl-bucket").single("imageUrl");

  uploadSingle(req, res, async (err) => {
    const { title, content, category, subtitle } = req.body;
    const imageUrl = req.file.location;
    if (err) return res.status(400).json({ msg: err.message });

    // console.log(req.file);

    const newNews = new News({
      title,
      subtitle,
      content,
      imageUrl,
      category,
    });

    await newNews.save();

    res.status(201).json({ msg: newNews });
  });
};

exports.allNewsController = async (req, res) => {
  const resource = await News.find();
  const page = req.query.p || 0;
  const newsPerPage = 3;

  await News.find()
    .skip(page * newsPerPage)
    .limit(newsPerPage)
    .then((response) => {
      res.status(200).json({
        msg: response,
        resourceLength: resource.length,
        newsPerPage,
        page,
      });
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};

exports.allNewsForDashboardController = async (req, res) => {
  const resource = await News.find();
  const page = req.query.p || 0;
  const newsPerPage = 10;

  News.find()
    .skip(page * newsPerPage)
    .limit(newsPerPage)
    .then((response) => {
      res.status(200).json({
        msg: response,
        resourceLength: resource.length,
        newsPerPage,
        page,
      });
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
};

exports.deleteNewsController = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findByIdAndDelete(id);

    if (!news) {
      return res
        .status(404)
        .json({ msg: `cannot find any product with ID ${id}` });
    }
    res.status(200).json({ msg: "Deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getNewsController = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findById(id);

    if (!news) {
      return res
        .status(404)
        .json({ msg: `cannot find any product with ID ${id}` });
    }
    res.status(200).json({ msg: news });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

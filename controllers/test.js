const Test = require("../models/test");

exports.postTest = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newTest = await Test({
      title,
      content,
    });

    newTest.save();

    res.status(201).json({
      status: "Success",
      msg: newTest,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      msg: error.message,
    });
  }
};

exports.getTest = async (req, res) => {
  const response = await Test.find();
  try {
    res.status(200).json({
      status: "Success",
      msg: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      msg: error.msg,
    });
  }
};

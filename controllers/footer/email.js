const Email = require("../../models/footer/email");

exports.addEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const newEmail = new Email({
      email,
    });
    await newEmail.save();

    res.status(201).json({
      email: newEmail,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.updateEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const email = await Email.findByIdAndUpdate(
      id,
      { email: req.body.email },
      { new: true }
    );
    res.status(200).json({ email });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const email = await Email.findById(id);
    if (!email) {
      return res.status(404).json({ msg: "not found" });
    }
    res.status(200).json({ email });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

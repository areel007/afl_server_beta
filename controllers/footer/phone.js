const Phone = require("../../models/footer/phone");

exports.addPhone = async (req, res) => {
  try {
    const { phone } = req.body;
    const newPhone = new Phone({
      phone,
    });
    await newPhone.save();

    res.status(201).json({
      phone: newPhone,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.updatePhone = async (req, res) => {
  try {
    const { id } = req.params;
    const phone = await Phone.findByIdAndUpdate(
      id,
      { phone: req.body.phone },
      { new: true }
    );
    res.status(200).json({ phone });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getPhone = async (req, res) => {
  try {
    const { id } = req.params;
    const phone = await Phone.findById(id);
    if (!phone) {
      return res.status(404).json({ msg: "not found" });
    }
    res.status(200).json({ phone });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

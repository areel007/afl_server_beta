const RolloutText = require("../../models/about-us/rollout.text");

exports.addRolloutText = async (req, res) => {
  try {
    const { rolloutText } = req.body;
    const newRolloutText = new RolloutText({ rolloutText });
    await newRolloutText.save();

    res.status(201).json({
      status: "success",
      newRolloutText,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getRolloutText = async (req, res) => {
  try {
    const rolloutText = await RolloutText.findById("659c5ffae37d47276571177c");
    if (!rolloutText) {
      res.status(404).json({
        status: "fail",
        msg: "not found",
      });
    }

    res.status(200).json({
      status: "success",
      rolloutText,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.updateRolloutText = async (req, res) => {
  try {
    const { rolloutText } = req.body; // Assuming you're sending the updated text in the request body

    // Find the document by ID and update it
    const updatedRolloutText = await RolloutText.findByIdAndUpdate(
      "659c5ffae37d47276571177c",
      { rolloutText }, // Update the field you want to modify
      { new: true, runValidators: true }
    );

    if (!updatedRolloutText) {
      // If no document was found with the specified ID
      return res.status(404).json({
        status: "fail",
        message: "RolloutText not found",
      });
    }

    res.status(200).json({
      status: "success",
      updatedRolloutText,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

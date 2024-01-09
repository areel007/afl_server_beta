const OurPlatformText = require("../../models/about-us/our.platform.text");

exports.addOurPlatformText = async (req, res) => {
  try {
    const { ourPlatformText } = req.body;
    const newOurPlatformText = new OurPlatformText({
      ourPlatformText,
    });
    await newOurPlatformText.save();

    res.status(201).json({
      status: "success",
      newOurPlatformText,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getOurPlatformText = async (req, res) => {
  try {
    const { id } = req.params;
    const ourPlatformText = await OurPlatformText.findById(id);
    if (!ourPlatformText) {
      res.status(404).json({
        status: "fail",
        msg: "not found",
      });
    }

    res.status(200).json({
      status: "success",
      ourPlatformText,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.updateOurPlatformText = async (req, res) => {
  try {
    const { id } = req.params;
    const { ourPlatformText } = req.body; // Assuming you're sending the updated text in the request body

    // Find the document by ID and update it
    const updatedOurPlatformText = await OurPlatformText.findByIdAndUpdate(
      id,
      { ourPlatformText }, // Update the field you want to modify
      { new: true, runValidators: true }
    );

    if (!updatedOurPlatformText) {
      // If no document was found with the specified ID
      return res.status(404).json({
        status: "fail",
        message: "OurPlatformText not found",
      });
    }

    res.status(200).json({
      status: "success",
      updatedOurPlatformText,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

const OurInfrastructureText = require("../../models/about-us/our.infrastructure.text");

exports.addOurInfrastructureText = async (req, res) => {
  try {
    const { ourInfrastructureText } = req.body;
    const newOurInfrastructureText = new OurInfrastructureText({
      ourInfrastructureText,
    });
    await newOurInfrastructureText.save();

    res.status(201).json({
      status: "success",
      newOurInfrastructureText,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getOurInfrastructureText = async (req, res) => {
  try {
    const { id } = req.params;
    const ourInfrastructureText = await OurInfrastructureText.findById(id);
    if (!ourInfrastructureText) {
      res.status(404).json({
        status: "fail",
        msg: "not found",
      });
    }

    res.status(200).json({
      status: "success",
      ourInfrastructureText,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.updateOurInfrastructureText = async (req, res) => {
  try {
    const { id } = req.params;
    const { ourInfrastructureText } = req.body; // Assuming you're sending the updated text in the request body

    // Find the document by ID and update it
    const updatedOurInfrastructureText =
      await OurInfrastructureText.findByIdAndUpdate(
        id,
        { ourInfrastructureText }, // Update the field you want to modify
        { new: true, runValidators: true }
      );

    if (!updatedOurInfrastructureText) {
      // If no document was found with the specified ID
      return res.status(404).json({
        status: "fail",
        message: "OurInfrastructureText not found",
      });
    }

    res.status(200).json({
      status: "success",
      updatedOurInfrastructureText,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

const OurServiceText = require("../../models/about-us/our.service.text");

exports.addServiceText = async (req, res) => {
  try {
    const { ourServiceText } = req.body;
    const newOurServiceText = new OurServiceText({ ourServiceText });
    await newOurServiceText.save();

    res.status(201).json({
      status: "success",
      newOurServiceText,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getOurServiceText = async (req, res) => {
  try {
    const id = req.params.id;
    const ourServiceText = await OurServiceText.findById(id);
    if (!ourServiceText) {
      res.status(404).json({
        status: "fail",
        msg: "not found",
      });
    }

    res.status(200).json({
      status: "success",
      ourServiceText,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.updateOurServiceText = async (req, res) => {
  try {
    const id = req.params.id;
    const { ourServiceText } = req.body; // Assuming you're sending the updated text in the request body

    // Find the document by ID and update it
    const updatedOurServiceText = await OurServiceText.findByIdAndUpdate(
      id,
      { ourServiceText }, // Update the field you want to modify
      { new: true, runValidators: true }
    );

    if (!updatedOurServiceText) {
      // If no document was found with the specified ID
      return res.status(404).json({
        status: "fail",
        message: "ourServiceText not found",
      });
    }

    res.status(200).json({
      status: "success",
      updatedOurServiceText,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

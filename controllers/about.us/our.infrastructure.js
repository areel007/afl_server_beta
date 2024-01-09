const OurInfrastructure = require("../../models/about-us/our.infrastructure");

exports.addOurInfrastructure = async (req, res) => {
  try {
    const options = {
      folder: "afl/about-us/our-infrastructure",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newImage = new OurInfrastructure({
      ourInfrastructureImg: result.secure_url,
      cloudinaryId: result.public_id,
    });
    await newImage.save();

    res.status(201).json({
      status: "success",
      ourInfrastructureImg: newImage,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getOurInfrastructure = async (req, res) => {
  try {
    const { id } = req.params;
    const ourInfrastructure = await OurInfrastructure.findById(id);

    if (!ourInfrastructure) {
      return res.status(404).json({
        msg: "not found",
      });
    }

    res.status(200).json({
      ourInfrastructure,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.updateOurInfrastructure = async (req, res) => {
  try {
    const id = req.params.id;
    const ourInfrastructure = await OurInfrastructure.findById(id);

    if (!ourInfrastructure) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(ourInfrastructure.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "afl/about-us/our-infrastructure",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    // Update the banner object with the new image URL and public ID
    ourInfrastructure.ourInfrastructureImg = result.secure_url;
    ourInfrastructure.cloudinaryId = result.public_id;

    // Save the updated banner object to the database
    await ourInfrastructure.save();

    res.status(200).json({
      ourInfrastructure,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

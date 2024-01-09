const cloudinary = require("../../utils/cloudinary");
const OurPlatform = require("../../models/about-us/our.platform");

exports.addOurPlatform = async (req, res) => {
  try {
    const options = {
      folder: "afl/about-us/our-platform",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newImage = new OurPlatform({
      ourPlatformImg: result.secure_url,
      cloudinaryId: result.public_id,
    });
    await newImage.save();

    res.status(201).json({
      status: "success",
      ourPlatformImg: newImage,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getOurPlatform = async (req, res) => {
  try {
    const { id } = req.params;
    const ourPlatform = await OurPlatform.findById(id);

    if (!ourPlatform) {
      return res.status(404).json({
        msg: "not found",
      });
    }

    res.status(200).json({
      ourPlatform,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.updateOurPlatform = async (req, res) => {
  try {
    const id = req.params.id;
    const ourPlatform = await OurPlatform.findById(id);

    if (!ourPlatform) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(ourPlatform.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "afl/about-us/our-platform",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    // Update the banner object with the new image URL and public ID
    ourPlatform.ourPlatformImg = result.secure_url;
    ourPlatform.cloudinaryId = result.public_id;

    // Save the updated banner object to the database
    await ourPlatform.save();

    res.status(200).json({
      ourPlatform,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

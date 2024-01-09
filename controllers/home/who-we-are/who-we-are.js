const WhoWeAre = require("../../../models/home/who-we-are/who-we-are");
const cloudinary = require("../../../utils/cloudinary");

exports.addWhoWeAreImg = async (req, res) => {
  try {
    const options = {
      folder: "afl/home/who-we-are",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newImage = new WhoWeAre({
      whoWeAreImgUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await newImage.save();

    res.status(201).json({
      newImage,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getWhoWeAreImg = async (req, res) => {
  try {
    const { id } = req.params;
    const whoWeAreImg = await WhoWeAre.findById(id);

    if (!whoWeAreImg) {
      return res.status(404).json({
        status: "fail",
        msg: "not found",
      });
    }

    res.status(200).json({
      status: "success",
      whoWeAreImg,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.updateWhoWeAreImg = async (req, res) => {
  try {
    const id = req.params.id;
    const whoWeAreImg = await WhoWeAre.findById(id);

    if (!whoWeAreImg) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(whoWeAreImg.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "afl/home/who-we-are",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    // Update the banner object with the new image URL and public ID
    whoWeAreImg.whoWeAreImgUrl = result.secure_url;
    whoWeAreImg.cloudinaryId = result.public_id;

    // Save the updated banner object to the database
    await whoWeAreImg.save();

    res.status(200).json({
      whoWeAreImg,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

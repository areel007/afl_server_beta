const Rollout = require("../../models/about-us/rollout");
const cloudinary = require("../../utils/cloudinary");

exports.addRolloutImg = async (req, res) => {
  try {
    const options = {
      folder: "afl/about-us/rollout",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newImage = new Rollout({
      rolloutImg: result.secure_url,
      cloudinaryId: result.public_id,
    });
    await newImage.save();

    res.status(201).json({
      status: "success",
      rolloutimg: newImage,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getRolloutImg = async (req, res) => {
  try {
    const { id } = req.params;
    const rolloutImg = await Rollout.findById(id);
    if (!rolloutImg) {
      return res.status(404).json({ msg: "not find" });
    }
    res.status(200).json({ rolloutImg });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.updateRolloutImg = async (req, res) => {
  try {
    const id = req.params.id;
    const rolloutImg = await Rollout.findById(id);

    if (!rolloutImg) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(rolloutImg.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "afl/about-us/rollout",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    // Update the banner object with the new image URL and public ID
    rolloutImg.rolloutImg = result.secure_url;
    rolloutImg.cloudinaryId = result.public_id;

    // Save the updated banner object to the database
    await rolloutImg.save();

    res.status(200).json({
      rolloutImg,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

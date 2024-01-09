const DeepPenetration = require("../../../models/home/deep-penetration/deep-penetration-img");
const cloudinary = require("../../../utils/cloudinary");

exports.addDeepPenetrationImg = async (req, res) => {
  try {
    const options = {
      folder: "afl/home/deep-penetration",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newImage = new DeepPenetration({
      deepPenetrationImgUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await newImage.save();

    res.status(201).json({
      newImage,
    });
  } catch (error) {
    res.status(500).json({
      status: "success",
      error,
    });
  }
};

exports.getDeepPenetrationImg = async (req, res) => {
  try {
    const deepPenetrationImgId = req.params.id;
    const deepPenetrationImg = await DeepPenetration.findById(
      deepPenetrationImgId
    );

    if (!deepPenetrationImg) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      deepPenetrationImg,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateDeepPenetrationImg = async (req, res) => {
  try {
    const id = req.params.id;
    const deepPenetrationImg = await DeepPenetration.findById(id);

    if (!deepPenetrationImg) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(deepPenetrationImg.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "afl/home/deep-penetration",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    // Update the banner object with the new image URL and public ID
    deepPenetrationImg.deepPenetrationImgUrl = result.secure_url;
    deepPenetrationImg.cloudinaryId = result.public_id;

    // Save the updated banner object to the database
    await deepPenetrationImg.save();

    res.status(200).json({
      deepPenetrationImg,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getDeepPenetration = async (req, res) => {
  const dp = await DeepPenetration.find();

  res.status(200).json({ dp });
};

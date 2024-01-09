const HeroFiveImg = require("../../../models/home/hero/heroFive/heroFiveImg");
const cloudinary = require("../../../utils/cloudinary");
const HeroFiveText = require("../../../models/home/hero/heroFive/heroFiveText");

exports.addHeroFiveImg = async (req, res) => {
  try {
    const options = {
      folder: "afl/home/hero",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newHeroImage = new HeroFiveImg({
      heroFiveImgUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await newHeroImage.save();

    res.status(201).json({
      newHeroImage,
    });
  } catch (error) {
    res.status(500).json({
      status: "success",
      error,
    });
  }
};

exports.getHeroFiveImg = async (req, res) => {
  try {
    const heroFiveImgId = req.params.id;
    const heroFiveImg = await HeroFiveImg.findById(heroFiveImgId);

    if (!heroFiveImg) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      heroFiveImg,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateHeroFiveImg = async (req, res) => {
  try {
    const heroFiveImgId = req.params.id;
    const heroFiveImg = await HeroFiveImg.findById(heroFiveImgId);

    if (!heroFiveImg) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(heroFiveImg.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "afl/home/hero",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    // Update the banner object with the new image URL and public ID
    heroFiveImg.heroFiveImgUrl = result.secure_url;
    heroFiveImg.cloudinaryId = result.public_id;

    // Save the updated banner object to the database
    await heroFiveImg.save();

    res.status(200).json({
      heroFiveImg,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.addHeroFiveText = async (req, res) => {
  try {
    const { heroFiveText } = req.body;
    await new HeroFiveText({
      heroFiveText,
    }).save();
    res.status(201).json({
      status: "success",
      msg: "text added",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.updateHeroFiveText = async (req, res) => {
  try {
    const heroFiveTextId = req.params.id;
    const { heroFiveText } = req.body;

    const updatedHeroFiveText = await HeroFiveText.findByIdAndUpdate(
      heroFiveTextId,
      { heroFiveText },
      { new: true } // To return the updated document in the response
    );

    if (!updatedHeroFiveText) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      heroFiveText: updatedHeroFiveText,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getHeroFiveText = async (req, res) => {
  try {
    const { id } = req.params;
    const heroFiveText = await HeroFiveText.findById(id);
    if (!heroFiveText) {
      return res.status(404).json({
        status: "fail",
        msg: "not found",
      });
    }
    res.status(200).json({
      status: "success",
      heroFiveText,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

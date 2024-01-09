const HeroThreeImg = require("../../../models/home/hero/heroThree/heroThreeImg");
const cloudinary = require("../../../utils/cloudinary");
const HeroThreeText = require("../../../models/home/hero/heroThree/heroThreeText");

exports.addHeroThreeImg = async (req, res) => {
  try {
    const options = {
      folder: "afl/home/hero",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newHeroImage = new HeroThreeImg({
      heroThreeImgUrl: result.secure_url,
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

exports.getHeroThreeImg = async (req, res) => {
  try {
    const heroThreeImgId = req.params.id;
    const heroThreeImg = await HeroThreeImg.findById(heroThreeImgId);

    if (!heroThreeImg) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      heroThreeImg,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateHeroThreeImg = async (req, res) => {
  try {
    const heroThreeImgId = req.params.id;
    const heroThreeImg = await HeroThreeImg.findById(heroThreeImgId);

    if (!heroThreeImg) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(heroThreeImg.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "afl/home/hero",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    // Update the banner object with the new image URL and public ID
    heroThreeImg.heroThreeImgUrl = result.secure_url;
    heroThreeImg.cloudinaryId = result.public_id;

    // Save the updated banner object to the database
    await heroThreeImg.save();

    res.status(200).json({
      heroThreeImg,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.addHeroThreeText = async (req, res) => {
  try {
    const { heroThreeText } = req.body;
    await new HeroThreeText({
      heroThreeText,
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

exports.updateHeroThreeText = async (req, res) => {
  try {
    const heroThreeTextId = req.params.id;
    const { heroThreeText } = req.body;

    const updatedHeroThreeText = await HeroThreeText.findByIdAndUpdate(
      heroThreeTextId,
      { heroThreeText },
      { new: true } // To return the updated document in the response
    );

    if (!updatedHeroThreeText) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      heroOneText: updatedHeroThreeText,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getHeroThreeText = async (req, res) => {
  try {
    const { id } = req.params;
    const heroThreeText = await HeroThreeText.findById(id);
    if (!heroThreeText) {
      return res.status(404).json({
        status: "fail",
        msg: "not found",
      });
    }
    res.status(200).json({
      status: "success",
      heroThreeText,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

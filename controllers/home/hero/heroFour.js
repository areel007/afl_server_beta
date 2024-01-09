const HeroFourImg = require("../../../models/home/hero/heroFour/heroFourImg");
const cloudinary = require("../../../utils/cloudinary");
const HeroFourText = require("../../../models/home/hero/heroFour/heroFourText");

exports.addHeroFourImg = async (req, res) => {
  try {
    const options = {
      folder: "afl/home/hero",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newHeroImage = new HeroFourImg({
      heroFourImgUrl: result.secure_url,
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

exports.getHeroFourImg = async (req, res) => {
  try {
    const heroFourImgId = req.params.id;
    const heroFourImg = await HeroFourImg.findById(heroFourImgId);

    if (!heroFourImg) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      heroFourImg,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateHeroFourImg = async (req, res) => {
  try {
    const heroFourImgId = req.params.id;
    const heroFourImg = await HeroFourImg.findById(heroFourImgId);

    if (!heroFourImg) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(heroFourImg.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "afl/home/hero",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    // Update the banner object with the new image URL and public ID
    heroFourImg.heroFourImgUrl = result.secure_url;
    heroFourImg.cloudinaryId = result.public_id;

    // Save the updated banner object to the database
    await heroFourImg.save();

    res.status(200).json({
      heroFourImg,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.addHeroFourText = async (req, res) => {
  try {
    const { heroFourText } = req.body;
    await new HeroFourText({
      heroFourText,
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

exports.updateHeroFourText = async (req, res) => {
  try {
    const heroFourTextId = req.params.id;
    const { heroFourText } = req.body;

    const updatedHeroFourText = await HeroFourText.findByIdAndUpdate(
      heroFourTextId,
      { heroFourText },
      { new: true } // To return the updated document in the response
    );

    if (!updatedHeroFourText) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      heroFourText: updatedHeroFourText,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getHeroFourText = async (req, res) => {
  try {
    const { id } = req.params;
    const heroFourText = await HeroFourText.findById(id);
    if (!heroFourText) {
      return res.status(404).json({
        status: "fail",
        msg: "not found",
      });
    }
    res.status(200).json({
      status: "success",
      heroFourText,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const HeroTwoImg = require("../../../models/home/hero/heroTwo/heroTwoImg");
const cloudinary = require("../../../utils/cloudinary");
const HeroTwoText = require("../../../models/home/hero/heroTwo/heroTwoText");

exports.addHeroTwoImg = async (req, res) => {
  try {
    const options = {
      folder: "afl/home/hero",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newHeroImage = new HeroTwoImg({
      heroTwoImgUrl: result.secure_url,
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

exports.getHeroTwoImg = async (req, res) => {
  try {
    const heroTwoImgId = req.params.id;
    const heroTwoImg = await HeroTwoImg.findById(heroTwoImgId);

    if (!heroTwoImg) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      heroTwoImg,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateHeroTwoImg = async (req, res) => {
  try {
    const heroTwoImgId = req.params.id;
    const heroTwoImg = await HeroTwoImg.findById(heroTwoImgId);

    if (!heroTwoImg) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(heroTwoImg.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "afl/home/hero",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    // Update the banner object with the new image URL and public ID
    heroTwoImg.heroTwoImgUrl = result.secure_url;
    heroTwoImg.cloudinaryId = result.public_id;

    // Save the updated banner object to the database
    await heroTwoImg.save();

    res.status(200).json({
      heroTwoImg,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.addHeroTwoText = async (req, res) => {
  try {
    const { heroTwoText } = req.body;
    await new HeroTwoText({
      heroTwoText,
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

exports.updateHeroTwoText = async (req, res) => {
  try {
    const heroTwoTextId = req.params.id;
    const { heroTwoText } = req.body;

    const updatedHeroTwoText = await HeroTwoText.findByIdAndUpdate(
      heroTwoTextId,
      { heroTwoText },
      { new: true } // To return the updated document in the response
    );

    if (!updatedHeroTwoText) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      heroOneText: updatedHeroTwoText,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getHeroTwoText = async (req, res) => {
  try {
    const { id } = req.params;
    const heroTwoText = await HeroTwoText.findById(id);
    if (!heroTwoText) {
      return res.status(404).json({
        status: "fail",
        msg: "not found",
      });
    }
    res.status(200).json({
      status: "success",
      heroTwoText,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

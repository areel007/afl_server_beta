const HeroImg = require("../../models/about-us/hero/hero.img");
const HeroText = require("../../models/about-us/hero/hero.text");
const cloudinary = require("../../utils/cloudinary");

exports.addHeroImg = async (req, res) => {
  try {
    const options = {
      folder: "afl/about-us/hero",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newImage = new HeroImg({
      aboutHeroImg: result.secure_url,
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

exports.getHeroImg = async (req, res) => {
  try {
    const { id } = req.params;
    const heroImg = await HeroImg.findById(id);
    if (!heroImg) {
      return res.status(404).json({ msg: "not found" });
    }
    res.status(200).json({ heroImg });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.updateHeroImg = async (req, res) => {
  try {
    const id = req.params.id;
    const heroImg = await HeroImg.findById(id);

    if (!heroImg) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(heroImg.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "afl/about-us/hero",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    // Update the banner object with the new image URL and public ID
    heroImg.aboutHeroImg = result.secure_url;
    heroImg.cloudinaryId = result.public_id;

    // Save the updated banner object to the database
    await heroImg.save();

    res.status(200).json({
      heroImg,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.addHeroText = async (req, res) => {
  try {
    const { heroText } = req.body;
    const newHeroText = new HeroText({
      aboutHeroText: heroText,
    });
    await newHeroText.save();
    res.status(201).json({
      status: "success",
      heroText: newHeroText,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getHeroText = async (req, res) => {
  try {
    const heroText = await HeroText.find();
    res.status(200).json({ heroText });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

const HeroOneImg = require("../../../models/home/hero/heroOne/heroOneImg");
const cloudinary = require("../../../utils/cloudinary");
const HeroOneText = require("../../../models/home/hero/heroOne/heroOneText");

exports.addHeroOneImg = async (req, res) => {
  try {
    const options = {
      folder: "afl/home/hero",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newHeroImage = new HeroOneImg({
      heroOneImgUrl: result.secure_url,
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

exports.getHeroOneImg = async (req, res) => {
  try {
    const heroOneImgId = req.params.id;
    const heroOneImg = await HeroOneImg.findById(heroOneImgId);

    if (!heroOneImg) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      heroOneImg,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateHeroOneImg = async (req, res) => {
  try {
    const heroOneImgId = req.params.id;
    const heroOneImg = await HeroOneImg.findById(heroOneImgId);

    if (!heroOneImg) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(heroOneImg.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "afl/home/hero",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    // Update the banner object with the new image URL and public ID
    heroOneImg.heroOneImgUrl = result.secure_url;
    heroOneImg.cloudinaryId = result.public_id;

    // Save the updated banner object to the database
    await heroOneImg.save();

    res.status(200).json({
      heroOneImg,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.addHeroOneText = async (req, res) => {
  try {
    const { heroOneText } = req.body;
    await new HeroOneText({
      heroOneText,
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

exports.updateHeroOneText = async (req, res) => {
  try {
    const heroOneTextId = req.params.id;
    const { heroOneText } = req.body;

    const updatedHeroOneText = await HeroOneText.findByIdAndUpdate(
      heroOneTextId,
      { heroOneText },
      { new: true } // To return the updated document in the response
    );

    if (!updatedHeroOneText) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      heroOneText: updatedHeroOneText,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getHeroOneText = async (req, res) => {
  try {
    const { id } = req.params;
    const heroOneText = await HeroOneText.findById(id);
    if (!heroOneText) {
      return res.status(404).json({
        status: "fail",
        msg: "not found",
      });
    }
    res.status(200).json({
      status: "success",
      heroOneText,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const OurService = require("../../models/about-us/our.service");
const cloudinary = require("../../utils/cloudinary");

exports.addOurServiceImg = async (req, res) => {
  try {
    const options = {
      folder: "afl/about-us/our-service",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newImage = new OurService({
      ourServiceImg: result.secure_url,
      cloudinaryId: result.public_id,
    });
    await newImage.save();

    res.status(201).json({
      status: "success",
      ourServiceImg: newImage,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getOurServiceImg = async (req, res) => {
  try {
    const { id } = req.params;
    const ourServiceImg = await OurService.findById(id);
    if (!ourServiceImg) {
      return res.status(404).json({ msg: "not find" });
    }
    res.status(200).json({ ourServiceImg });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.updateOurServiceImg = async (req, res) => {
  try {
    const id = req.params.id;
    const ourService = await OurService.findById(id);

    if (!ourService) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(ourService.cloudinaryId);

    // Upload the updated banner image to Cloudinary
    const options = {
      folder: "afl/about-us/our-service",
      resource_type: "auto",
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);

    // Update the banner object with the new image URL and public ID
    ourService.ourService = result.secure_url;
    ourService.cloudinaryId = result.public_id;

    // Save the updated banner object to the database
    await ourService.save();

    res.status(200).json({
      ourService,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

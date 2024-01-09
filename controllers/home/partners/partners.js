const Partner = require("../../../models/home/partners/partners");
const cloudinary = require("../../../utils/cloudinary");

exports.addPartner = async (req, res) => {
  try {
    const options = {
      folder: "afl/home/partners",
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(req.file.path, options);

    const newImage = new Partner({
      partnerImgUrl: result.secure_url,
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

exports.getPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    res.status(200).json({
      status: "success",
      partners,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const partner = await Partner.findById(id);

    if (!partner) {
      return res.status(404).json({
        msg: "Resource not found",
      });
    }

    // Delete the old image from Cloudinary
    await cloudinary.uploader.destroy(partner.cloudinaryId);

    // Delete from MongoDB using findOneAndRemove
    const removedPartner = await Partner.findOneAndRemove({ _id: id });

    if (removedPartner) {
      console.log("Document removed:", removedPartner);
      res.status(200).json({
        status: "success",
        msg: "Deleted",
      });
    } else {
      console.log("Document not found");
      res.status(404).json({
        status: "fail",
        msg: "Document not found",
      });
    }
  } catch (error) {
    console.error("Error removing document:", error);
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

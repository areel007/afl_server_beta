const Address = require("../models/address");

exports.addAddress = async (req, res) => {
  const {
    address,
    longitude,
    latitude
  } = req.body;

  try {
    const newAddress = await Address({
      address,
      longitude,
      latitude
    });

    newAddress.save();

    res.status(201).json({
      status: "success",
      msg: "address successfully added",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

// exports.getApplications = async (req, res) => {
//   try {
//     const applications = await ApplicationForm.find();

//     if (!applications) {
//       return res.status(404).json({
//         status: "fail",
//         msg: "application not found",
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       applications,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       error,
//     });
//   }
// };

// exports.deleteApplication = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const application = await ApplicationForm.findByIdAndDelete(id);

//     if (!application) {
//       return res
//         .status(404)
//         .json({ msg: `cannot find any application with ID ${id}` });
//     }
//     res.status(200).json({ msg: "application successfully deleted" });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       error,
//     });
//   }
// };

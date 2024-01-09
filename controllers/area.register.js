const AreaRegister = require("../models/area.register");

exports.createAreaRegister = async (req, res) => {
  try {
    const { firstname, longitude, email, latitude, area, isPlanned } = req.body;
    const newArea = await AreaRegister({
      firstname,
      longitude,
      email,
      latitude,
      area,
      isPlanned
    });

    newArea.save();

    res.status(201).json({
      success: "true",
      msg: "Your area has been successfully registered",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.createAreaRegisterAdmin = async (req, res) => {
  try {
    const { firstname, longitude, email, latitude, area } = req.body;
    const newArea = await AreaRegister({
      firstname,
      longitude,
      email,
      latitude,
      area,
      isPlanned: true
    });

    newArea.save();

    res.status(201).json({
      success: "true",
      msg: "Your area has been successfully registered",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getAreas = async (req, res) => {
  try {
    const areas = await AreaRegister.find();
    res.status(200).json({
      status: "success",
      msg: areas,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getArea = async (req, res) => {
  try {
    const { selectedAddress } = req.params;
    const area = await AreaRegister.findOne({ area: selectedAddress });
    res.status(200).json({
      status: "success",
      area
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.toggleIsPlanned = async (req, res) => {
  try {
    const { areaId } = req.params;
    const area = await AreaRegister.findById(areaId);

    console.log(area);

    if (!area) {
      return res.status(404).json({
        status: "fail",
        error: "Area not found",
      });
    }

    area.isPlanned = !area.isPlanned;
    await area.save();

    res.status(200).json({
      status: "success",
      msg: "isPlanned value toggled successfully",
      area,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};


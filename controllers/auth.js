const User = require("../models/auth");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Registration
exports.registerController = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  user.save((err) => {
    if (err) {
      res.status(500).json({ msg: err });
    } else {
      res.json({ msg: "User created!" });
    }
  });
};

// Login
exports.loginController = (req, res) => {
  // fixes
  User.findOne({ username: req.body.username }, (err, user) => {
    try {
      if (err) {
        res.status(500).json({ msg: err });
      } else if (!user) {
        res.json({ msg: "User not found" });
      } else {
        if (req.body.password === user.password) {
          res.json({ msg: "Logged in" });
        } else {
          res.json({ msg: "Wrong username or password" });
        }
      }
    } catch (error) {
      res.status(501).json({ msg: error });
    }
  });
};

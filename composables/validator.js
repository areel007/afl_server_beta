const { check } = require("express-validator");

exports.validate = [
  // check("email", "Please provide a valid email").isEmail(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 8 characters long"),
  check("password")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/)
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
];

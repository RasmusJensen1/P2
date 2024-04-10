const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user.model");

exports.login_get = asyncHandler(async (req, res, next) => {
  res.render("login", {
    title: "Login",
    errors: undefined,
  });
});

exports.login_post = [
  // Add login error handling

  asyncHandler(async (req, res, next) => {
    var data = {
      username: req.body.username,
      password: req.body.password,
    };
    console.log(data);

    res.redirect("my-budgets");
  }),
];

exports.signup_get = asyncHandler(async (req, res, next) => {
  res.render("login", {
    title: "Sign up",
    errors: undefined,
  });
});

exports.signup_post = [
  body("newUsername", "Username must be atleast 4 and max 20 characters")
    .trim()
    .isLength({ min: 4 })
    .isLength({ max: 20 })
    .escape(),

  body("newUsername", "Username must not contain whitespaces")
    .trim()
    .custom((value) => !/\s/.test(value))
    .escape(),

  body("newPassword", "Password must be atleast 8 and max 20 characters")
    .trim()
    .isLength({ min: 8 })
    .isLength({ max: 20 })
    .escape(),

  body("newPassword", "Password must not contain whitespaces")
    .trim()
    .custom((value) => !/\s/.test(value))
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    var newData = {
      newUsername: req.body.newUsername,
      newPassword: req.body.newPassword,
      repeatPassword: req.body.repeatPassword,
    };

    console.log(newData);

    if (newData.newPassword !== newData.repeatPassword) {
      errors.errors.push({ msg: "Passwords do not match" });
    }

    if (!errors.isEmpty()) {
      res.render("login", {
        title: "Sign up",
        errors: errors.array(),
      });
    }
    res.redirect("login");
  }),
];

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user.model");

exports.login_get = (req, res) => {
  res.render("login", {
    title: "Login",
    errors: undefined,
  });
};

exports.login_post = [
  body("username", "Username cannot be longer than 20 characters")
    .trim()
    .isLength({ max: 20 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    var data = {
      username: req.body.username,
      password: req.body.password,
    };

    const user_login = await User.findOne({ username: data.username }).exec();

    if (!user_login) {
      errors.errors.push({ msg: "Username does not exist" });
    } else if (user_login.password !== data.password) {
      errors.errors.push({ msg: "Incorrect password" });
    }

    if (!errors.isEmpty()) {
      res.render("login", {
        title: "Login",
        errors: errors.array(),
      });

    } else {
      const userCookie = btoa(JSON.stringify({ id:user_login._id,  username: user_login.username }))
      res.cookie("user_cookie", userCookie,  { maxAge: 900000, encode: String }).redirect("/my-budgets");
    }
  }),
];

exports.signup_get = (req, res) => {
  res.render("login", {
    title: "Sign up",
    errors: undefined,
  });
};

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

  body("newPassword", "Password must be atleast 10 and max 20 characters")
    .trim()
    .isLength({ min: 10 })
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


    if (newData.newPassword !== newData.repeatPassword) {
      errors.errors.push({ msg: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ username: newData.newUsername });

    if (existingUser) {
      errors.errors.push({ msg: "Username already taken" });
    }

    if (errors.isEmpty()) {
      try {
        await User.create({
          username: newData.newUsername,
          password: newData.newPassword,
        });
      } catch (error) {
        console.error("Error creating user:", error);
        errors.errors.push({ msg: "Error adding user to database" });
      }
    }

    if (!errors.isEmpty()) {
      res.render("login", {
        title: "Sign up",
        errors: errors.array(),
      });
    } else {
      res.redirect("/login");
    }
  }),
];

exports.logout_get = (req, res, next) => {
  res.clearCookie("user_cookie").redirect("/login");
};
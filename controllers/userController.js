const asyncHandler = require("express-async-handler");

exports.login = asyncHandler(async (req, res, next) => {
  res.render("login", {
    title: "login",
  });
});

exports.create_account = asyncHandler(async (req, res, next) => {
  res.render("createaccount", {
    title: "create_account",
  });
});


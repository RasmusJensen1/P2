const asyncHandler = require("express-async-handler");

exports.login = asyncHandler(async (req, res, next) => {
  res.render("login");
});

exports.create_account = asyncHandler(async (req, res, next) => {
  res.render("createaccount");
});

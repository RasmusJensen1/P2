const asyncHandler = require("express-async-handler");

exports.home_page = asyncHandler(async (req, res, next) => {
  res.render("home");
});

exports.info = asyncHandler(async (req, res, next) => {
  res.render("info");
});

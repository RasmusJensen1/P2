const asyncHandler = require("express-async-handler");

exports.home_page = asyncHandler(async (req, res, next) => {
  res.render("home", {
    title: "home",
  });
});

exports.info = asyncHandler(async (req, res, next) => {
  res.render("info", {
    title: "info",
  });
});

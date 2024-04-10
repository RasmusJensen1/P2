const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.budget_instance = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Budget_instance", {
    title: "budget_instance",
  });
});

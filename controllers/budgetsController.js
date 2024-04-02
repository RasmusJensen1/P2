const asyncHandler = require("express-async-handler");

exports.my_budgets = asyncHandler(async (req, res, next) => {
  res.render("mybudgets");
});

exports.create_budget = asyncHandler(async (req, res, next) => {
  res.render("createbudget");
});

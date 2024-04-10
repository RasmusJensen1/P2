const asyncHandler = require("express-async-handler");

exports.my_budgets = asyncHandler(async (req, res, next) => {
  res.render("mybudgets", {
    title: "my_budgets",
  });
});

exports.create_budget = asyncHandler(async (req, res, next) => {
  res.render("uploadBudget", {
    title: "create_budget",
  });
});

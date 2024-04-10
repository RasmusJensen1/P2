const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.my_budgets = asyncHandler(async (req, res, next) => {
  res.render("mybudgets", {
    title: "my_budgets",
  });
});

exports.create_budget = asyncHandler(async (req, res, next) => {
  res.render("createbudget", {
    title: "create_budget",
  });
});

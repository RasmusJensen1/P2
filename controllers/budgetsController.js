const asyncHandler = require("express-async-handler");

exports.my_budgets =  (req, res) => {
  res.render("mybudgets", {
    title: "my_budgets",
    budgets: [1,2,3,4,5],
  });
};

exports.create_budget = asyncHandler(async (req, res, next) => {
  res.render("uploadBudget", {
    title: "create_budget",
  });
});

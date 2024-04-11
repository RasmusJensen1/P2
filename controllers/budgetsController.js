const asyncHandler = require("express-async-handler");

exports.my_budgets = (req, res) => {
  res.render("mybudgets", {
    title: "My_budgets",
    budgets: [1, 2, 3, 4, 5],
  });
};

exports.create_budget = asyncHandler(async (req, res, next) => {
  res.render("createbudget", {
    title: "Create_budget",
  });
});

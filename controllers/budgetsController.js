const asyncHandler = require("express-async-handler");

exports.my_budgets =  (req, res) => {
  res.render("mybudgets", {
    title: "my_budgets",
    budgets: [1,2,3,4,5],
  });
};

exports.create_budget_get = asyncHandler(async (req, res, next) => {
  res.render("uploadBudget", {
    title: "create_budget",
  });
});

exports.create_budget_post = asyncHandler(async (req, res, next) => {
  res.redirect("/my-budgets");
}); 

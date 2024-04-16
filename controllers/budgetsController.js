const asyncHandler = require("express-async-handler");
const Budget = require ("../models/budget.model");

exports.my_budgets = (req, res) => {
  res.render("mybudgets", {
    title: "My_budgets",
    budgets: [1, 2, 3, 4, 5],
  });
};

exports.create_budget_get = (req, res) => {
  res.render("uploadBudget", {
    title: "Create_budget",
  });
};

exports.create_budget_post = asyncHandler(async (req, res, next) => {
  var data = {
    budgetName: req.body.name,
    budgetStyle: req.body.budgetstyle,
  };
  console.log(data);

  try{
    await Budget.create({
      name: data.budgetName,
      //tilføj type
    });
  } catch (error) {
    console.error("Error creating budget:", error);
  }
  res.redirect("my-budgets");
}); 
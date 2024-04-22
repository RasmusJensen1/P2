const asyncHandler = require("express-async-handler");
const Budget = require("../models/budget.model");

exports.my_budgets = asyncHandler(async (req, res, next) => {
  const allBudgets = await Budget.find();
  res.render("mybudgets", {
    title: "My_budgets",
    budget_list: allBudgets,
  });
});

exports.create_budget_get = (req, res) => {
  res.render("uploadBudget", {
    title: "Create_budget",
  });
};

exports.create_budget_post = asyncHandler(async (req, res, next) => {
  const data = {
    budgetName: req.body.name,
    budgetStyle: req.body.budgetstyle,
  };

  try {
    await Budget.create({
      name: data.budgetName,
      type: data.budgetStyle
    });
  } catch (error) {
    console.error("Error creating budget:", error);
  }
  res.redirect("/my-budgets");
});

exports.budget_remove_post = asyncHandler(async (req, res, next) => {

  if (req.body.selectedBudgets && req.body.selectedBudgets.length > 0) {
    // Remove all selected budgets
    // $in is used to match any of the budgets in the array
    await Budget.deleteMany({ _id: { $in: req.body.selectedBudgets } });
    res.status(200).send("Budgets removed successfully");
    return
  }

  res.status(400).send("No budgets selected");
  

});
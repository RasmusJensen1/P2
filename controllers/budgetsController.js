const asyncHandler = require("express-async-handler");
const Budget = require("../models/budget.model");

exports.my_budgets = asyncHandler(async (req, res, next) => {
  const hasUser = req.cookies.user_cookie;

  if(!hasUser) {
    return res.status(401).redirect("/login");
  }
  const user = JSON.parse(atob(decodeURIComponent(hasUser)));

  const userBudgets = await Budget.find({userId: user.id});

  res.render("mybudgets", {
    title: "My_budgets",
    budget_list: userBudgets,
  });
});

exports.create_budget_get = (req, res) => {
  res.render("uploadBudget", {
    title: "Create_budget",
  });
};

exports.create_budget_post = asyncHandler(async (req, res, next) => {
  const hasUser = req.cookies.user_cookie;
  if(!hasUser) {
    return res.status(401).send("Unauthorized");
  }
  const user = JSON.parse(atob(decodeURIComponent(hasUser)));

  const budget = req.body

  if(budget.budgetFile){
    try {
      await Budget.create({
        ...budget.budgetFile,
        name: budget.budgetName || budget.budgetFile.name,
        budgetType: budget.budgetType,
        userId: user.id,
      });
    } catch (error) {
      console.error("Error creating budget:", error);
    }
  } else {
    try {
      await Budget.create({
        name: budget.budgetName,
        budgetType: budget.budgetType,
        userId: user.id
      });
    } catch (error) {
      console.error("Error creating budget:", error);
    }
  }

  res.redirect(200, '/my-budgets');
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
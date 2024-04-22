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
  const hasUser = req.cookies.user_cookie;
  if(!hasUser) {
    return res.status(401).send("Unauthorized");
  }
  const user = JSON.parse(atob(decodeURIComponent(hasUser)));

  const data = {
    budgetName: req.body.name,
    budgetStyle: req.body.budgetstyle,
    id: user.id,
  };

  try{
    await Budget.create({
      name: data.budgetName,
      type: data.budgetStyle,
      userId: data.id
    });
  } catch (error) {
    console.error("Error creating budget:", error);
  }
  res.redirect("/my-budgets");
});

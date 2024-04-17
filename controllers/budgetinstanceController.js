const asyncHandler = require("express-async-handler");
const Budget = require("../models/budget.model");

exports.budget_instance_get = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);

  const budget = await Budget.findById(id).exec();

  res.render("budgetinstance", {
    title: "Budget_instance",
    budget: budget,
  });
});

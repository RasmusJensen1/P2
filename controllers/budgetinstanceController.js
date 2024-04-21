const asyncHandler = require("express-async-handler");
const Budget = require("../models/budget.model");

exports.budget_instance_get = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const budget = await Budget.findById(id).exec();

  res.render("budgetinstance", {
    title: "Budget_instance",
    budget: budget,
  });
});

exports.budget_instance_post = asyncHandler(async (req, res, next) => {
  const budget = req.body;
  id = budget._id;

  try {
    // Update the existing budget document if it exists
    const updatedBudget = await Budget.findOneAndUpdate(
      { _id: id },
      { $set: { 
        name: budget.name,
        type: budget.budgetType,
        totalIncome: budget.totalIncome,
        totalExpense: budget.totalExpense,
        expenses: budget.expenses,
      }},
      { new: true }
    );
  } catch (error) {
    console.error("Error updating budget:", error);
  }
  
});

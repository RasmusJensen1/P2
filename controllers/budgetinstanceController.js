const asyncHandler = require("express-async-handler");

exports.budget_instance_get = asyncHandler(async (req, res, next) => {
  res.render("budgetinstance", {
    title: "Budget_instance",
  });
});

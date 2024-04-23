const asyncHandler = require("express-async-handler");
const Budget = require("../models/budget.model");

exports.budget_instance_get = asyncHandler(async (req, res, next) => {
  // Get id from the URL params
  const id = req.params.id;

  try {
    // Find the budget document by id
    const budget = await Budget.findById(id).exec();
    // Render budgetinstance view
    // with found budget data
    res.render("budgetinstance", {
      title: "Budget_instance",
      budget: budget,
    });
  } catch (error) {
    res.status(404).send("Budget not found");  
  }
});

exports.budget_instance_post = asyncHandler(async (req, res, next) => {
  const budget = req.body;
  const hasUser = req.cookies.user_cookie;
  if(!hasUser) {
    return res.status(401).send("Unauthorized");
  }
  const user = JSON.parse(atob(decodeURIComponent(hasUser)));


  try {
    // Update the existing budget document if it exists
    await Budget.findOneAndUpdate(
      { _id: budget._id, userId: user.id},
      { 
        ...budget
      },
      { new: true, runValidators: true}
    );
  } catch (error) {
    console.error("Error updating budget:", error);
  }
  
  res.status(200).json("Budget saved succesfully");

});

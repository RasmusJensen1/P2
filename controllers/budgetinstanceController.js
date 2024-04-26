const asyncHandler = require("express-async-handler");
const Budget = require("../models/budget.model");

exports.budget_instance_get = asyncHandler(async (req, res, next) => {
  // Get id from the URL params
  const id = req.params.id;

  try {
    // Find the budget document by id
    const budget = await Budget.findById(id).exec();

    if (!budget) {
      // If budget is not found, return 400 Not Found
      res.status(400).send("Budget not found");
      return;
    }

    // Render budgetinstance view
    // with found budget data
    res.render("budgetinstance", {
      title: "Budget_instance",
      budget: budget,
    });
  } catch (error) {
    // If there is an error, return 404 Not Found
    res.status(404).send("Error getting budget: " + error);  
  }
});

exports.budget_instance_post = asyncHandler(async (req, res, next) => {
  // Get budget data from the request body
  const budget = req.body;
  // Check if there is a user_cookie
  const hasUser = req.cookies.user_cookie;

  // If there is no user_cookie, return 401 Unauthorized
  if(!hasUser) {
    return res.status(401).send("Unauthorized");
  }

  // Decode user cookie
  const user = JSON.parse(atob(decodeURIComponent(hasUser)));

  try {
    // Update the existing budget document if it exists
    // and the user id matches the user id in the cookie
    await Budget.findOneAndUpdate(
      { _id: budget._id, userId: user.id},
      { 
        ...budget
      },
      { new: true, runValidators: true}
    );
  } catch (error) {
    // Send error message if there is an error updating the budget
    res.status(400).json("Error updating budget");
    return
  }
  
  res.status(200).json("Budget saved succesfully");
});

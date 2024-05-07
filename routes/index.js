const express = require("express");
const router = express.Router();

const budget_controller = require("../controllers/budgetsController");
const budgetinstance_controller = require("../controllers/budgetinstanceController");
const index_controller = require("../controllers/indexController");
const user_controller = require("../controllers/userController");

/* GET home page */
router.get("/home", index_controller.home_page);

/* GET first entry home page */
router.get("/", index_controller.home_page);

/* GET info page */
router.get("/info", index_controller.info);

/* GET create-budget page */
router.get("/create-budget", budget_controller.create_budget_get);

/* POST create-budget page */
router.post("/create-budget", budget_controller.create_budget_post);

/* GET my-budgets page */
router.get("/my-budgets", budget_controller.my_budgets);

/* GET login page */
router.get("/login", user_controller.login_get);

/* POST login page */
router.post("/login", user_controller.login_post);

/* GET sign up page */
router.get("/sign-up", user_controller.signup_get);

/* POST signup */
router.post("/sign-up", user_controller.signup_post);

/* GET logout */
router.get("/logout", user_controller.logout_get);

/* GET BudgetInstance */
router.get("/budgetinstance/:id",budgetinstance_controller.budget_instance_get);

/* POST remove budgets */
router.post('/remove', budget_controller.budget_remove_post);

/* POST budget instance */
router.post("/budgetinstance/:id",budgetinstance_controller.budget_instance_post);

module.exports = router;

var express = require("express");
var router = express.Router();

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
router.get("/create-budget", budget_controller.create_budget);

/* GET my-budgets page */
router.get("/my-budgets", budget_controller.my_budgets);

/* GET login page */
router.get("/login", user_controller.login);

/* GET create-account page */
router.get("create-account", user_controller.create_account);

/* GET budget instance page (Not implemented) */
router.get("budgetinstance", budgetinstance_controller.budget_instance);

module.exports = router;

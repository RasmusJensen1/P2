var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/home", function (req, res, next) {
  res.render("home");
});

router.get("/", function (req, res, next) {
  res.render("home");
});

router.get("/info", function (req, res, next) {
  res.render("info");
});

router.get("/create-budget", function (req, res, next) {
  res.render("createbudget");
});

router.get("/my-budgets", function (req, res, next) {
  res.render("mybudgets");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

module.exports = router;

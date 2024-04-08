const asyncHandler = require("express-async-handler");

exports.login_get = asyncHandler(async (req, res, next) => {
  res.render("login", {
    title: "Login",
  });
});

exports.login_post = asyncHandler(async (req, res, next) => {
  var data = {
    email: req.body.email,
    password: req.body.password,
  };
  console.log(data);

  res.redirect("my-budgets");
});

// // Tjek for at se om det virker
// console.log("Username:", email);
// console.log("Password:", password);
// // Sender til bruger email og kode virker
// res.send("Form submitted successfully!");

exports.signup_get = asyncHandler(async (req, res, next) => {
  res.render("login", {
    title: "Sign up",
  });
});

exports.signup_post = asyncHandler(async (req, res, next) => {
  var newData = {
    newEmail: req.body.newEmail,
    newPassword: req.body.newPassword,
    repeatPassword: req.body.repeatPassword,
  };

  console.log(newData);

  if (newData.newPassword === newData.repeatPassword) {
    res.redirect("login");
  } else {
    res.redirect("sign-up");
  }
});

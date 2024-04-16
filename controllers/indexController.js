exports.home_page = (req, res) => {
  res.render("home", {
    title: "Home",
  });
};

exports.info = (req, res) => {
  res.render("info", {
    title: "Info",
  });
};

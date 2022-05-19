exports.signup = (req, res) => {
  res.render("signup", { layout: false });
};

exports.signin = (req, res) => {
  res.render("signin", { layout: false });
};
exports.dashboard = (req, res) => {
  res.render("dashboard", { layout: false });
};
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};

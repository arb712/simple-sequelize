const authController = require("../controllers/user.controller.js");

module.exports = (app, passport) => {
  const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/signin");
  };

  app.get("/signup", authController.signup);
  app.get("/signin", authController.signin);
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",

      failureRedirect: "/signup",
    })
  );
  app.get("/dashboard", isLoggedIn, authController.dashboard);
  app.get("/logout", authController.logout);
  app.post("/signin", (req, res, next) => {
    passport.authenticate(
      "local-signin",
      {
        successRedirect: "/dashboard",
        failureRedirect: "/signin",
      },
      (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.json({ message: info.message });
        }
        res.json(user);
      }
    )(req, res, next);
  });
};

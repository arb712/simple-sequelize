const bCrypt = require("bcrypt-nodejs");

module.exports = (passport, user) => {
  const User = user;
  const LocalStrategy = require("passport-local").Strategy;

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        const generateHash = (password) => {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        User.findOne({
          where: {
            email: email,
          },
        }).then((user) => {
          if (user) {
            return done(null, false, {
              message: "Email already taken",
            });
          } else {
            const userPassword = generateHash(password);
            const data = {
              email: email,
              password: userPassword,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
            };
            User.create(data).then((newUser, created) => {
              if (!newUser) {
                return done(null, flase);
              }
              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );
  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        const User = user;
        const isPasswordValid = (userpass, password) => {
          return bCrypt.compareSync(password, userpass);
        };
        User.findOne({
          where: { email: email },
        })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: "Email does not exist.",
              });
            }
            if (!isPasswordValid(user.password, password)) {
              return done(null, false, {
                message: "Password Incorect.",
              });
            }
            const userInfo = user.get();
            return done(null, userInfo);
          })
          .catch((err) => {
            console.log("Error:", err);
            return done(null, false, {
              message: "Something went wrong.",
            });
          });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
};

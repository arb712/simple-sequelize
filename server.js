const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const env = require("dotenv").config({ path: ".env" });
const exphbs = require("express-handlebars");
const app = express();
const corsOptions = {
  origin: "http://localhost:8080",
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secureKey",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 100 * 60 * 60 * 24 * 30 }, // 30 Days
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("views", "./app/views");
app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

const db = require("./app/models");
const authRoutes = require("./app/routes/auth.js")(app, passport);
require("./app/routes/tutRoutes.js")(app);
require("./app/config/passport/passport.js")(passport, db.userModels);

db.sequelize
  .sync()
  .then(() => {
    console.log("Database running fine");
  })
  .catch((err) => {
    console.log(err, "Database does not running fine");
  });

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Application running without problems." });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

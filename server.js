const express = require("express");
const cors = require("cors");
const app = express();
const tutRoutes = require("./app/routes/tutRoutes.js");
const corsOptions = {
  origin: "http://localhost:8081",
};
const db = require("./app/models");
db.sequelize.sync();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Application running without problems." });
});

app.use("/api/tutorials", tutRoutes);
require("./app/routes/tutRoutes.js")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

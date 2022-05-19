"use strict";

const fs = require("fs");
const path = require("path");
const env = process.env.NODE_ENV || "development";
const dbConfig = require(path.join(
  __dirname,
  "..",
  "config",
  "db.config.json"
))[env];
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);
const db = {};

fs.readdirSync(__dirname)
  .filter(function (file) {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach(function (file) {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tutModels = require("./tut.model.js")(sequelize, Sequelize);
db.userModels = require("./user.model.js")(sequelize, Sequelize);
module.exports = db;
